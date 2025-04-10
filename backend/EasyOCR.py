import easyocr
import fitz  # PyMuPDF for direct PDF text extraction
import io
from PIL import Image
import re
import json
import openai


# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

# OpenAI API key
openai.api_key =  os.getenv("OPENAI_KEY") # Replace with your actual API key


def get_structured_json(extracted_text):
    # openai.api_key = "YOUR_OPENAI_API_KEY"

    prompt = f"""
    Extract relevant tax information from the following unstructured text and return it in the JSON format below:

    Example:
    {{
      "Employer": {{
        "Name": "DELOITTE SUPPORT SERVICES INDIA PRIVATE LIMITED",
        "Address": "FLOOR 15, DELOITTE TOWER 1, SURVEY NO. 41, GACHIBOWALI VILLAGE, HYDERABAD - 500032, Telangana",
        "TAN": "HYDD01619C",
        "PAN": "AABCD9761D"
      }},
      "Employee": {{
        "Name": "MOHAMMED MUBEEN",
        "Address": "17-1-137/D/20, MUBEEN COLONY REIN BAZAR, YAKUTHPURA, HYDERABAD, HYDERABAD - 500023, Andhra Pradesh",
        "PAN": "ATOPM4017E",
        "Assessment Year": "2022-23",
        "Period with Employer": {{
          "From": "01-Apr-2021",
          "To": "31-Mar-2022"
        }}
      }},
      "SalaryDetails": {{
        "GrossSalary": 2557983.00,
        "Exemptions": {{
          "HouseRentAllowance": 180150.00,
          "LeaveEncashment": 0.00,
          "TravelAllowance": 0.00,
          "Gratuity": 0.00
        }},
        "TotalTaxableIncome": 2377833.00
      }},
      "TaxDetails": {{
        "TotalTaxDeducted": 483740.00,
        "TotalTaxDeposited": 483740.00,
        "QuarterlyBreakup": [
          {{"Quarter": "Q1", "AmountPaid": 762578.00, "TaxDeducted": 158446.00}},
          {{"Quarter": "Q2", "AmountPaid": 571506.00, "TaxDeducted": 99247.00}},
          {{"Quarter": "Q3", "AmountPaid": 592463.00, "TaxDeducted": 105051.00}},
          {{"Quarter": "Q4", "AmountPaid": 631436.00, "TaxDeducted": 120996.00}}
        ]
      }},
      "InvestmentRecommendations": {{
        "EPF": "Recommended to maximize tax-free contributions",
        "PPF": "Consider investing for long-term tax-free returns",
        "ELSS": "Potential for high returns with 80C benefits",
        "NPS": "Can help save additional tax under 80CCD(1B)",
        "FDs": "Choose 5-year tax-saving FDs for deductions"
      }}
    }}

    Now, process the following text and return structured JSON:

    {extracted_text}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are an AI that extracts structured data for tax calculations."},
                  {"role": "user", "content": prompt}],
        temperature=0
    )

    structured_data = response["choices"][0]["message"]["content"]
    return json.loads(structured_data)  # Convert JSON string to Python dictionary




def extract_text_from_image(image_path):
    """
    Extracts text from an image file using EasyOCR.
    """
    result = reader.readtext(image_path, detail=0)
    return "\n".join(result)

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF without using Poppler.
    Uses PyMuPDF (fitz) to extract text directly or render images for OCR.
    """
    doc = fitz.open(pdf_path)
    extracted_text = ""

    for page_num in range(len(doc)):
        text = doc[page_num].get_text()  # Try extracting text directly
        if text.strip():  
            extracted_text += text + "\n\n"
        else:
            # If no text found, use EasyOCR on images
            pix = doc[page_num].get_pixmap()
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='PNG')
            
            extracted_text += extract_text_from_image(img_byte_arr) + "\n\n"

    return extracted_text

# Example usage:
# if __name__ == "__main__":
file_path = "form16.pdf"  # Change to "form16.png" if using an image
print(f"Processing file: {file_path}")
if file_path.lower().endswith(".pdf"):
    extracted_text = extract_text_from_pdf(file_path)
else:
    extracted_text = extract_text_from_image(file_path)


# print("\nStructured JSON:\n", structured_json)

print("\nExtracted Text:\n", extracted_text)
structured_json = get_structured_json(extracted_text)

# Print or store the structured JSON
print(json.dumps(structured_json, indent=2))
