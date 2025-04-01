from flask import Flask, request, jsonify
from AgenticAutogen import tax_calculation_agent, user_context_agent, tax_optimization_agent, user_proxy

import openai
import random
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/calculate_tax', methods=['POST'])
def calculate_tax():
    print("Helloooooooooooo")
    user_data = {
      "Employer": {
        "Name": "DELOITTE SUPPORT SERVICES INDIA PRIVATE LIMITED",
        "Address": "FLOOR 15, DELOITTE TOWER 1, SURVEY NO. 41, GACHIBOWALI VILLAGE, HYDERABAD - 500032, Telangana",
        "TAN": "HYDD01619C",
        "PAN": "AABCD9761D"
      },
      "Employee": {
        "Name": "MOHAMMED MUBEEN",
        "Address": "17-1-137/D/20, MUBEEN COLONY REIN BAZAR, YAKUTHPURA, HYDERABAD, HYDERABAD - 500023, Andhra Pradesh",
        "PAN": "ATOPM4017E",
        "Assessment Year": "2022-23",
        "Period with Employer": {
          "From": "01-Apr-2021",
          "To": "31-Mar-2022"
        }
      },
      "SalaryDetails": {
        "GrossSalary": 2557983.00,
        "Exemptions": {
          "HouseRentAllowance": 180150.00,
          "LeaveEncashment": 0.00,
          "TravelAllowance": 0.00,
          "Gratuity": 0.00
        },
        "TotalTaxableIncome": 2377833.00
      },
      "TaxDetails": {
        "TotalTaxDeducted": 483740.00,
        "TotalTaxDeposited": 483740.00,
        "QuarterlyBreakup": [
          {"Quarter": "Q1", "AmountPaid": 762578.00, "TaxDeducted": 158446.00},
          {"Quarter": "Q2", "AmountPaid": 571506.00, "TaxDeducted": 99247.00},
          {"Quarter": "Q3", "AmountPaid": 592463.00, "TaxDeducted": 105051.00},
          {"Quarter": "Q4", "AmountPaid": 631436.00, "TaxDeducted": 120996.00}
        ]
      },
      "InvestmentRecommendations": {
        "EPF": "Recommended to maximize tax-free contributions",
        "PPF": "Consider investing for long-term tax-free returns",
        "ELSS": "Potential for high returns with 80C benefits",
        "NPS": "Can help save additional tax under 80CCD(1B)",
        "FDs": "Choose 5-year tax-saving FDs for deductions"
      }
    }

    # Initiate conversation with Tax Calculation Agent
    response = user_proxy.initiate_chat(
        tax_calculation_agent,
        message=f"Calculate tax for the following data: {user_data}"
    )
    return jsonify(response)


@app.route('/optimize_tax', methods=['POST'])
def optimize_tax():
    user_data = user_data = {
      "Employer": {
        "Name": "DELOITTE SUPPORT SERVICES INDIA PRIVATE LIMITED",
        "Address": "FLOOR 15, DELOITTE TOWER 1, SURVEY NO. 41, GACHIBOWALI VILLAGE, HYDERABAD - 500032, Telangana",
        "TAN": "HYDD01619C",
        "PAN": "AABCD9761D"
      },
      "Employee": {
        "Name": "MOHAMMED MUBEEN",
        "Address": "17-1-137/D/20, MUBEEN COLONY REIN BAZAR, YAKUTHPURA, HYDERABAD, HYDERABAD - 500023, Andhra Pradesh",
        "PAN": "ATOPM4017E",
        "Assessment Year": "2022-23",
        "Period with Employer": {
          "From": "01-Apr-2021",
          "To": "31-Mar-2022"
        }
      },
      "SalaryDetails": {
        "GrossSalary": 2557983.00,
        "Exemptions": {
          "HouseRentAllowance": 180150.00,
          "LeaveEncashment": 0.00,
          "TravelAllowance": 0.00,
          "Gratuity": 0.00
        },
        "TotalTaxableIncome": 2377833.00
      },
      "TaxDetails": {
        "TotalTaxDeducted": 483740.00,
        "TotalTaxDeposited": 483740.00,
        "QuarterlyBreakup": [
          {"Quarter": "Q1", "AmountPaid": 762578.00, "TaxDeducted": 158446.00},
          {"Quarter": "Q2", "AmountPaid": 571506.00, "TaxDeducted": 99247.00},
          {"Quarter": "Q3", "AmountPaid": 592463.00, "TaxDeducted": 105051.00},
          {"Quarter": "Q4", "AmountPaid": 631436.00, "TaxDeducted": 120996.00}
        ]
      },
      "InvestmentRecommendations": {
        "EPF": "Recommended to maximize tax-free contributions",
        "PPF": "Consider investing for long-term tax-free returns",
        "ELSS": "Potential for high returns with 80C benefits",
        "NPS": "Can help save additional tax under 80CCD(1B)",
        "FDs": "Choose 5-year tax-saving FDs for deductions"
      }
    }
    # Initiate conversation with Tax Optimization Agent
    response = user_proxy.initiate_chat(
        tax_optimization_agent,
        message=f"Suggest tax-saving strategies for the following data: {user_data}"
    )
    return jsonify(response)

@app.route('/fill_form', methods=['POST'])
def fill_form():
    print("fill formmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    user_data = {
      "Employer": {
        "Name": "DELOITTE SUPPORT SERVICES INDIA PRIVATE LIMITED",
        "Address": "FLOOR 15, DELOITTE TOWER 1, SURVEY NO. 41, GACHIBOWALI VILLAGE, HYDERABAD - 500032, Telangana",
        "TAN": "HYDD01619C",
        "PAN": "AABCD9761D"
      },
      "Employee": {
        "Name": "MOHAMMED MUBEEN",
        "Address": "17-1-137/D/20, MUBEEN COLONY REIN BAZAR, YAKUTHPURA, HYDERABAD, HYDERABAD - 500023, Andhra Pradesh",
        "PAN": "ATOPM4017E",
        "Assessment Year": "2022-23",
        "Period with Employer": {
          "From": "01-Apr-2021",
          "To": "31-Mar-2022"
        }
      },
      "SalaryDetails": {
        "GrossSalary": 2557983.00,
        "Exemptions": {
          "HouseRentAllowance": 180150.00,
          "LeaveEncashment": 0.00,
          "TravelAllowance": 0.00,
          "Gratuity": 0.00
        },
        "TotalTaxableIncome": 2377833.00
      },
      "TaxDetails": {
        "TotalTaxDeducted": 483740.00,
        "TotalTaxDeposited": 483740.00,
        "QuarterlyBreakup": [
          {"Quarter": "Q1", "AmountPaid": 762578.00, "TaxDeducted": 158446.00},
          {"Quarter": "Q2", "AmountPaid": 571506.00, "TaxDeducted": 99247.00},
          {"Quarter": "Q3", "AmountPaid": 592463.00, "TaxDeducted": 105051.00},
          {"Quarter": "Q4", "AmountPaid": 631436.00, "TaxDeducted": 120996.00}
        ]
      },
      "InvestmentRecommendations": {
        "EPF": "Recommended to maximize tax-free contributions",
        "PPF": "Consider investing for long-term tax-free returns",
        "ELSS": "Potential for high returns with 80C benefits",
        "NPS": "Can help save additional tax under 80CCD(1B)",
        "FDs": "Choose 5-year tax-saving FDs for deductions"
      }
    }
    # Initiate conversation with User Context Agent
    response = user_proxy.initiate_chat(
        user_context_agent,
        message=f"Assist in filling the tax return form with the following data: {user_data}"
    )
    return jsonify(response)

# Set your OpenAI API key
openai.api_key = "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"  # Replace with your actual API key

def generate_tax_questions():
    prompt = """
    Generate 5 multiple-choice questions related to Indian income tax rules. 
    Each question should have a statement and a correct answer.
    Format:
    [
      {"question": "Your tax-related statement here.", "answer": "right/left"},
      ...
    ]
    "right" means it's a correct tax strategy.
    "left" means it's a tax mistake.
    """

    try:
        response = openai.chat.completions.create(
            model="gpt-4",  # Use "gpt-3.5-turbo" if needed
            messages=[{"role": "system", "content": "You are a tax expert."},
                      {"role": "user", "content": prompt}],
            temperature=0.7
        )

        # Extract text from response
        generated_text = response.choices[0].message.content.strip()
        
        # Convert response into a valid Python list
        tax_questions = eval(generated_text)  # ⚠️ Ensure OpenAI returns a valid format

        random.shuffle(tax_questions)
        return tax_questions

    except Exception as e:
        print(f"Error generating questions: {e}")
        return [
            {"question": "Error generating questions. Try again later.", "answer": "right"}
        ]

@app.route('/get_questions', methods=['GET'])
def get_questions():
    questions = generate_tax_questions()
    return jsonify(questions)

if __name__ == '__main__':
    app.run(debug=True)
