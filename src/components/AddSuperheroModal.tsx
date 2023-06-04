import React, { ChangeEvent, useState } from "react";
import InputField from "./InputField";
import { useCreateSuperheroMutation } from "@/api/api";
import { ISuperhero } from "@/superhero/superhero.slice";

type AddSuperheroModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddSuperheroModal: React.FC<AddSuperheroModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<ISuperhero>({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: [],
    catch_phrase: "",
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const [createSuperhero, { isLoading: createLoading }] =
    useCreateSuperheroMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "images" || name === "superpowers") {
      const valuesArray = value.split(",").map((item) => item.trim());
      setFormData((prevData) => ({ ...prevData, [name]: valuesArray }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form data:", formData);
      await createSuperhero(formData);

      setFormData({
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: [],
        catch_phrase: "",
        images: [],
      });
      onClose();
    } catch (error) {
      console.log("Failed to create superhero", error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6">
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="bg-red-500 text-white rounded-md px-3 py-1"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto text-black">
          <InputField
            label="Nickname"
            id="nickname"
            name="nickname"
            type="text"
            value={formData.nickname}
            onChange={handleInputChange}
          />

          <InputField
            label="Real Name"
            id="real_name"
            name="real_name"
            type="text"
            value={formData.real_name}
            onChange={handleInputChange}
          />

          <InputField
            label="Origin Description"
            id="origin_description"
            name="origin_description"
            type="textarea"
            value={formData.origin_description}
            onChange={handleInputChange}
          />

          <InputField
            label="Superpowers (separated by commas)"
            id="superpowers"
            name="superpowers"
            type="text"
            value={formData.superpowers.join(", ")}
            onChange={handleInputChange}
          />

          <InputField
            label="Catch Phrase"
            id="catch_phrase"
            name="catch_phrase"
            type="text"
            value={formData.catch_phrase}
            onChange={handleInputChange}
          />

          <InputField
            label="Images (separated by commas)"
            id="images"
            name="images"
            type="text"
            value={formData.images.join(", ")}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-lime-700 text-white rounded-md px-4 py-2"
          >
            {isLoading ? "Adding..." : "Add Superhero"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSuperheroModal;
