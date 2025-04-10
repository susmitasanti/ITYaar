from autogen import AssistantAgent, UserProxyAgent
import os
from dotenv import load_dotenv

load_dotenv()


OPENAI_API_KEY= os.getenv("OPENAI_KEY") # Replace with your actual API key
print(OPENAI_API_KEY)
# OPENAI_API_KEY = os.getenv("GPT_API_KEY")
# print(OPENAI_API_KEY)

llm_config = {
"model": "gpt-3.5-turbo",
"api_key": OPENAI_API_KEY,
"timeout": 60,
"max_tokens": 1000
}

tax_calculation_agent = AssistantAgent(
    name="TaxCalculator",
    llm_config=llm_config,
    system_message="""
            You are an expert in calculating income tax based on predefined Indian tax regimes. 
            Ensure accurate tax computation according to the latest slab rates, deductions, and cess calculations. 

            Key Guidelines:
            1. Apply the correct tax slab rates:
            - 0% for income up to ₹2,50,000
            - 5% for ₹2,50,001 - ₹5,00,000
            - 10% for ₹5,00,001 - ₹7,50,000
            - 15% for ₹7,50,001 - ₹10,00,000
            - 20% for ₹10,00,001 - ₹12,50,000
            - 25% for ₹12,50,001 - ₹15,00,000
            - 30% for income above ₹15,00,000

            2. Ensure correct tax computation for **income exceeding ₹15,00,000**, as incorrect calculations can lead to significant discrepancies.

            3. Compute **Health & Education Cess at 4%** on the total tax before cess.

            4. Ensure total tax payable includes cess before comparing it with TDS deducted.

            5. Correctly compute refunds:
            - If **TDS deducted** is greater than **total tax payable**, calculate the exact refund amount.
            - If **TDS deducted** is less than **total tax payable**, calculate the additional tax due.

            6. Provide a structured breakdown of tax computation, including:
            - Gross Salary and applicable exemptions.
            - Taxable income after exemptions.
            - Stepwise tax calculations for each slab.
            - Cess and final tax payable.
            - TDS details, tax liability/refund status, and quarterly TDS breakdown.

            7. Cross-check all computations before finalizing the tax report.

            Always ensure accurate calculations and adherence to Indian tax laws. If needed, verify results with known test cases to prevent under- or over-estimation of tax liabilities.
        
        """
)




user_context_agent = AssistantAgent(
    name="UserContextManager",
    llm_config=llm_config,
    system_message="You manage and recall user-specific data to assist in filling tax return forms."
)

tax_optimization_agent = AssistantAgent(
    name="TaxOptimizer",
    llm_config=llm_config,
    system_message="You provide tax-saving strategies based on Indian tax laws."
)

tax_validation_agent = AssistantAgent(
    name="TaxValidator",
    llm_config=llm_config,
    system_message="You validate tax calculations and ensure compliance with Indian tax laws."
)

user_proxy = UserProxyAgent(
    name="UserProxy",
    llm_config=llm_config,
    system_message="You facilitate communication between the user and the specialized tax agents.",
    code_execution_config={"use_docker": False}
)