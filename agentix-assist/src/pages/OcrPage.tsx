import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./ocrPage.css"; 

export function OCR() {
  return (
    <div className="ocr-container">
      <div className="ocr-card">
        <h2 className="ocr-title">Upload Document for OCR</h2>

        <div className="ocr-form-group">
          <Label htmlFor="picture" className="ocr-label">Select Image</Label>
          <Input
            id="picture"
            type="file"
            className="ocr-file-input"
          />
        </div>

      </div>
    </div>
  );
}