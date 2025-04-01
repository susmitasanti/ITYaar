import React, { useEffect, useState } from "react";
import { useAiAssistant, AiAssistantButton } from "@sista/ai-assistant-react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css"

function SistaAI() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    income: "",
    deductions: "",
    taxYear: "",
	panNumber: "",
  });

  const navigateToPage = (data) => {
    const { page } = data;
    if (!page || typeof page !== "string") {
      console.error("Invalid page value received:", page);
      return;
    }
    console.log(`Navigating to ${page}...`);
    navigate(`/${page.toLowerCase()}`);
  };

  const fillTaxForm = (data) => {
    console.log("Received tax form data:", data);
    setFormData((prevData) => ({ ...prevData, ...data }));
    alert("Tax form updated with provided details!");
  };

  const { registerFunctions } = useAiAssistant();

  useEffect(() => {
    const aiFunctions = [
      {
        function: {
          handler: navigateToPage,
          description: "Go to a specific page.",
          parameters: {
            type: "object",
            properties: {
              page: {
                type: "string",
                description: "The page to navigate to.",
                enum: ["empty", "Page 2", "Page 3"],
              },
            },
            required: ["page"],
          },
        },
      },
      {
        function: {
          handler: fillTaxForm,
          description: "Fill a tax-related form with user-provided details.",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string", description: "User's full name" },
              income: { type: "string", description: "Annual income" },
              deductions: {
                type: "string",
                description: "Total deductions claimed",
              },
              taxYear: { type: "string", description: "Tax year applicable" },
			  panNumber: {type: "string", description: "User's PAN Number"}
            },
            required: ["name", "income", "taxYear", "panNumber"],
          },
        },
      },
    ];

    if (registerFunctions) {
      registerFunctions(aiFunctions);
    }
  }, [registerFunctions]);

  return (
    <div>
      <h1>Tax Form</h1>
      <div className="form-container">
        <h2>Tax Information</h2>
        <form className="styled-form">
          <label>
            Name:
            <input type="text" value={formData.name} />
          </label>

          <label>
            Income:
            <input type="text" value={formData.income} />
          </label>

          <label>
            Deductions:
            <input type="text" value={formData.deductions} />
          </label>

          <label>
            Tax Year:
            <input type="text" value={formData.taxYear} />
          </label>

		  <label>
            PAN Number:
            <input type="text" value={formData.panNumber} />
          </label>
        </form>
      </div>
      <AiAssistantButton />
    </div>
  );
}

export default SistaAI;
