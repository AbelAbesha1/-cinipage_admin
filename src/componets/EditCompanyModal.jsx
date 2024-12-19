import React from "react";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function EditCompanyModal({
  open,
  onClose,
  company,
  setCompany,
  onUpdate,
}) {
  if (!company) return null;

  // Function to handle social media link updates
  const handleSocialMediaChange = (platform, value) => {
    setCompany({
      ...company,
      socialMediaLinks: {
        ...company.socialMediaLinks,
        [platform]: value, // Update the specific platform's link
      },
    });
  };

  
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
        method: "PUT", // Use the appropriate method for updates
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(updatedCompany), // Convert the object to JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // Parse the response
      console.log("Successfully updated company:", data);
  
      // Call onClose to close the modal after a successful update
      onClose();
    } catch (error) {
      console.error("Error updating company:", error.message);
    }
  };
  


  return (
    <Dialog
      size="xs"
      open={open}
      handler={onClose}
      className="bg-transparent shadow-none"
      aria-hidden={!open}
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Update Company
          </Typography>
          <Input
            label="Company Name"
            size="lg"
            value={company.name || ""}
            onChange={(e) =>
              setCompany({ ...company, name: e.target.value })
            }
          />
          <Input
            label="Address"
            size="lg"
            value={company.address || ""}
            onChange={(e) =>
              setCompany({ ...company, address: e.target.value })
            }
          />
          <Input
            label="Location"
            size="lg"
            value={company.locationLink || ""}
            onChange={(e) =>
              setCompany({ ...company, locationLink: e.target.value })
            }
          />
          <Input
            label="Website"
            size="lg"
            value={company.website || ""}
            onChange={(e) =>
              setCompany({ ...company, website: e.target.value })
            }
          />
          <Input
            label="Phone"
            size="lg"
            value={company.phone || ""}
            onChange={(e) =>
              setCompany({ ...company, phone: e.target.value })
            }
          />
          {/* Social Media Links */}
          <Input
            label="TikTok"
            size="lg"
            value={company.socialMediaLinks.TikTok || ""}
            onChange={(e) =>
              handleSocialMediaChange("TikTok", e.target.value)
            }
          />
          <Input
            label="LinkedIn"
            size="lg"
            value={company.socialMediaLinks.LinkedIn || ""}
            onChange={(e) =>
              handleSocialMediaChange("LinkedIn", e.target.value)
            }
          />
          <Input
            label="Instagram"
            size="lg"
            value={company.socialMediaLinks.Instagram || ""}
            onChange={(e) =>
              handleSocialMediaChange("Instagram", e.target.value)
            }
          />
          <Input
            label="Facebook"
            size="lg"
            value={company.socialMediaLinks.Facebook || ""}
            onChange={(e) =>
              handleSocialMediaChange("Facebook", e.target.value)
            }
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleSubmit} fullWidth>
            Update
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}
