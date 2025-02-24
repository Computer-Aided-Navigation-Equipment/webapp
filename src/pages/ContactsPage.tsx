import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import UserIcon from "../icons/UserIcon";
import PlusIcon from "../icons/PlusIcon";
import axiosRequest from "../utils/axiosConfig";
import toast from "react-hot-toast";
import { Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import PrimaryButton from "../components/PrimaryButton";
import CaregiverIcon from "../icons/CaregiverIcon";

function ContactsPage() {
  const [contacts, setContacts] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosRequest
      .get("/contact/get-user")
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      contactId: "",
    },
    validate: {
      contactId: (value) => {
        if (!value) {
          return "Contact Id is required";
        }
      },
    },
  });

  const handleSelectSearch = (value: string) => {
    axiosRequest
      .post("/user/search", {
        search: value,
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  };

  const handleAddContact = () => {
    axiosRequest
      .post("/contact/create", form.values)
      .then((res) => {
        toast.success(res.data.message);
        close();
      })
      .catch((err) => {
        if (err.response.data.message) {
          return toast.error(err.response.data.message);
        }
        toast.error("An error occurred");
      });
  };

  return (
    <MainLayout>
      <Container>
        <div className="flex relative flex-col w-full gap-[20px]">
          <div className="flex jutify-between w-full gap-[100px]">
            <h1 className="text-[36px] font-[700]">Saved Contacts</h1>
            <div className="h-[70px] w-[70px] rounded-full bg-[#4BB9B3E5] flex items-center justify-center">
              <UserIcon />
            </div>
          </div>
          <div className="flex justify-between w-full items-start">
            <div className="flex flex-col gap-[5px]">
              <span>Contacts</span>
              <span className="underline font-[600]">Edit</span>
            </div>
            <div
              onClick={open}
              className="h-[50px] w-[50px] rounded-full flex items-center justify-center cursor-pointer"
            >
              <PlusIcon />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[20px] mt-4 w-full">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 relative border shadow-sm bg-[#D9D9D980] rounded-[20px] h-[60px] flex items-center gap-[20px]"
              >
                <div className="w-[50px] h-[50px] bg-[#4BB9B3E5] rounded-full flex items-center justify-center">
                  <UserIcon />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <h2 className="text-xl font-[700]">
                    {contact.contactId.firstName} {contact.contactId.lastName}
                  </h2>
                  <p>{contact.contactId.phoneNumber || "3555 6666"}</p>
                  {contact.contactId.userType === "user" && (
                    <div className="absolute right-[5px] top-[50%] bottom-[50%]">
                      <CaregiverIcon />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Modal opened={opened} onClose={close} title="Add Contact">
        <form
          onSubmit={form.onSubmit(handleAddContact)}
          className="flex flex-col gap-[10px] w-full"
        >
          <Select
            label="Select a user"
            withAsterisk
            data={users.map((user) => ({
              value: user._id,
              label: `${user.firstName} ${user.lastName} - ${user.phoneNumber}`,
            }))}
            searchable
            placeholder="Select a user"
            onSearchChange={handleSelectSearch}
            {...form.getInputProps("contactId")}
          />
          <PrimaryButton type="submit">Add Contact</PrimaryButton>
        </form>
      </Modal>
    </MainLayout>
  );
}

export default ContactsPage;
