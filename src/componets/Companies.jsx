import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import EditCompanyModal from "./EditCompanyModal.jsx";
import DeleteCompanyModal from "./DeleteCompanyModal.jsx";

 // Fetch company data from the API

 
const TABLE_HEAD = ["User Name", "Email", "Company Name", "status", "phone", "address" , ""];
 

 
export function Companies() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);

    const handleOpen = (company) => {
      setCurrentCompany(company);
      setOpen((cur) => !cur);
    };
    const handleOpenEdit = (company) => {
        setCurrentCompany(company); 
        console.log(currentCompany)
        setOpenEdit((cur) => !cur);
    };
    const handleOpenDelete = (company) => {
      setCurrentCompany(company); 
      console.log(currentCompany)
      setOpenDelete((cur) => !cur);
  };
    
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
    
    useEffect(() => {
        const fetchCompanies = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/companies");
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error("Error fetching companies:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchCompanies();
      }, []);
      const updateStatus = async (Company,tag) => {
        console.log(Company.id)

      
        try {
          const { id } = Company;
          console.log("Updating status for:",Company);
      
          setData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, tag } : item
            )
          );
      
          const response = await fetch(`http://localhost:5000/api/companies/${id}/tag`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tag }),
          });
      
          if (!response.ok) {
            throw new Error("Failed to update status");
          }
      
          const updatedCompany = await response.json();
          console.log("Updated company:", updatedCompany);
          setOpen(false); // Close the dialog
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };
      
      const handleUpdateCompany = () => {
        console.log("Updated company:", currentCompany);
        // Add API call to update the company data
        setOpenEdit(false);
      }


      const TABLE_ROWS = data
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button className="flex items-center gap-3" size="sm">
           Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  id,
                  username,
                  email,
                  name,
                  tag,
                  phone,
                  address,
                  locationLink,
                  website,
                  socialMediaLinks


                },
                index,
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                    
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                         { username}
                        </Typography>
                    
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    
                    <td className={classes}>
                      <div className="w-max">
                      <Chip
                      onClick={() => handleOpen({ name, address,locationLink,website,socialMediaLinks,id,phone })} 
                      size="sm"
                      variant="ghost"
                      value={tag}
                      color={
                        tag === "approved" ? "green" : tag === "pending" ? "amber" : "red"
                      }
                    />
                        <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
             Update Company Status
            </Typography>
            
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => handleOpen({ name, address,locationLink,website,socialMediaLinks,id,phone })}
          >
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll !px-5">
          <div className="mb-6">
           
            <ul className="mt-3 -ml-2 flex flex-col gap-1">
            <MenuItem
  onClick={() => updateStatus( currentCompany, "approved" )}
  className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
>
  <Typography className="uppercase" color="blue-gray" variant="h6">
    Approve
  </Typography>
</MenuItem>
<MenuItem
  onClick={() => updateStatus(currentCompany, "not approved" )}
  className="mb-1 flex items-center justify-center gap-3 !py-4 shadow-md"
>
  <Typography className="uppercase" color="blue-gray" variant="h6">
    Not Approved
  </Typography>
</MenuItem>

            </ul>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          <Typography variant="small" color="gray" className="font-normal">
          Developed by Cini Solutions
          </Typography>
        </DialogFooter>
      </Dialog>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phone}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address}
                      </Typography>
                    </td>
                    <td className={classes}>
                        <IconButton onClick={() => handleOpenEdit({ name, address,locationLink,website,socialMediaLinks,phone,id,username,email })}   variant="text">
                          <PencilIcon  className="h-4 w-4" />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDelete({ name, address,locationLink,website,socialMediaLinks,phone,id,username,email })}   variant="text">
                          <TrashIcon  className="h-4 w-4" />
                        </IconButton>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
      <EditCompanyModal
        open={openEdit}
        onClose={handleCloseEdit}
        company={currentCompany}
        setCompany={setCurrentCompany}
        onUpdate={handleUpdateCompany}
      />
      <DeleteCompanyModal
        open={openDelete}
        onClose={handleCloseDelete}
        company={currentCompany}
        setCompany={setCurrentCompany}
      />
    </Card>
  );
}