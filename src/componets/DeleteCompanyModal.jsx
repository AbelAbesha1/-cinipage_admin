import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function DeleteCompanyModal({
  open,
  onClose,
  company,
  setCompany,
}) {
  if (!company) return null;

  const handleSubmit = async () => {
    const id = company.id
    console.log(id)
    // Prepare the updated company object
    const updatedCompany = {
      ...company,
      socialMediaLinks: company.socialMediaLinks, // Ensure it is sent as an object
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/companies/${id}`, {
        method: "DELETE", // Use the appropriate method for updates
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Successfully deleted company:", data);
      onClose();
    } catch (error) {
      console.error("Error deleting company:", error.message);
    }
  };
  


  return (
    <Dialog
        open={open}
        handler={onClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody>
         Are You Sure You Want to Delete This Company 
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={onClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
  );
}
