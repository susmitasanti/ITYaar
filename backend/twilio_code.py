from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
import re

app = Flask(__name__)

# Mock quiz questions
quiz = [
    {"question": "What is the basic exemption limit for individuals below 60 years under the old tax regime for FY 2023-24?\n(a) ₹2,50,000\n(b) ₹3,00,000\n(c) ₹5,00,000\n(d) ₹7,00,000", "answer": "2,50,000"},
    {"question": "Which section of the Income Tax Act deals with deductions for life insurance premium, PPF, and EPF?\n(a) Section 24\n(b) Section 80C\n(c) Section 10\n(d) Section 234F", "answer": "Section 80C"},
    {"question": "What is the maximum deduction allowed under Section 80C?\n(a) ₹1,50,000\n(b) ₹2,00,000\n(c) ₹2,50,000\n(d) ₹1,00,000", "answer": "1,50,000"},
    {"question": "Which form is used to file Income Tax Return (ITR) for salaried individuals with no other income?\n(a) ITR-1\n(b) ITR-2\n(c) ITR-3\n(d) ITR-4", "answer": "ITR-1"},
    {"question": "What is the due date for filing income tax returns for individuals (non-audit cases) for AY 2024-25?\n(a) 31st December\n(b) 31st March\n(c) 31st July\n(d) 30th September", "answer": "31 July"},
    {"question": "Which of the following incomes is exempt from tax under Section 10?\n(a) Salary Income\n(b) Agricultural Income\n(c) House Rent Allowance\n(d) Capital Gains", "answer": "Agricultural Income"},
    {"question": "Under which section can individuals claim deductions for interest on home loans?\n(a) Section 80E\n(b) Section 80C\n(c) Section 24(b)\n(d) Section 10(14)", "answer": "Section 24b"},
    {"question": "Which head of income includes rental income from house property?\n(a) Income from Salaries \n(b) Income from House Property \n(c) Capital Gains\n(d) Income from Business", "answer": "House Property"},
    {"question": "What is the GST rate on financial services such as bank charges?\n(a) 5% \n(b) 12% \n(c) 18% \n(d) 28%", "answer": "18%"},
    {"question": "What is the standard deduction available to salaried individuals in FY 2023-24?\n(a) ₹40,000  (b) ₹50,000  (c) ₹60,000  (d) ₹75,000", "answer": "50,000"},
    {"question": "Which form is issued by employers for TDS deducted from salary?\n(a) Form 15G\n(b) Form 16\n(c) Form 26AS\n(d) Form 10E", "answer": "Form 16"},
    {"question": "Under the new tax regime, what is the maximum rebate available under Section 87A for individuals?\n(a) ₹12,500\n(b) ₹25,000\n(c) ₹50,000\n(d) ₹75,000", "answer": "25000"},
    {"question": "Which section allows deductions for interest paid on an education loan?\n(a) Section 80C\n(b) Section 80E\n(c) Section 80D\n(d) Section 24(b)", "answer": "Section 80E"},
    {"question": "Advance tax payment is applicable if the total tax liability exceeds how much?\n(a) ₹5,000\n(b) ₹10,000\n(c) ₹25,000\n(d) ₹50,000", "answer": "10,000"},
    {"question": "What is the penalty for late filing of income tax returns after the due date (for non-audit cases)?\n(a) ₹1,000\n(b) ₹5,000\n(c) ₹10,000\n(d) ₹50,000", "answer": "5000"},
    {"question": "Which income tax form is applicable for businesses and professionals opting for presumptive taxation?\n(a) ITR-1\n(b) ITR-2\n(c) ITR-3\n(d) ITR-4", "answer": "ITR4"},
    {"question": "What is the tax rate applicable for long-term capital gains on equity shares exceeding ₹1 lakh?\n(a) 10%\n(b) 15% \n(c) 20%\n(d) 30%", "answer": "10"},
    {"question": "Which section allows deductions for medical insurance premiums paid?\n(a) Section 80C \n(b) Section 80D\n(c) Section 80G\n(d) Section 10(14)", "answer": "80D"},
    {"question": "Which section provides tax deductions for donations to charitable institutions?\n(a) Section 80C\n(b) Section 80D \n(c) Section 80G\n(d) Section 24", "answer": "80G"}
]

# Store user state
user_states = {}

def normalize_answer(text):
    return re.sub(r'[^0-9a-zA-Z]', '', text).lower()

@app.route("/whatsapp", methods=["POST"])
def whatsapp():
    incoming_msg = request.form.get('Body').strip().lower()
    from_number = request.form.get('From')
    resp = MessagingResponse()
    msg = resp.message()

    # Initialize user if not present
    if from_number not in user_states:
        user_states[from_number] = {"index": 0}
        msg.body(f"👋 Welcome to the Quiz Game!\n\n{quiz[0]['question']}")
        return str(resp)

    # Fetch user state
    index = user_states[from_number]["index"]
    
    # Normalize user input and answer
    user_input = normalize_answer(incoming_msg)
    correct_answer = normalize_answer(quiz[index]["answer"])
    
    # Check answer
    if user_input == correct_answer:
        index += 1
        if index < len(quiz):
            user_states[from_number]["index"] = index
            msg.body(f"✅ Correct!\n\nNext Question:\n{quiz[index]['question']}")
        else:
            msg.body("🎉 Congratulations! You've completed the quiz!")
            del user_states[from_number]  # reset
    else:
        msg.body("❌ Incorrect. Try again!")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
