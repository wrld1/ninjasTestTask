import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { ISuperhero } from "@/superhero/superhero.slice";
import { useUpdateSuperheroMutation } from "@/api/api";
import InputField from "@/components/InputField";

interface SuperheroPageProps {
  superhero: ISuperhero | undefined;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const superheroId = params?.id as string;

  try {
    const response = await axios.get<ISuperhero>(
      `http://localhost:5000/api/superheroes/${superheroId}`
    );
    const superhero = response.data;

    return {
      props: {
        superhero,
      },
    };
  } catch (error) {
    console.log("Error fetching superhero:", error);
    return {
      props: {},
    };
  }
};

const SuperheroPage: React.FC<SuperheroPageProps> = ({
  superhero: initialSuperhero,
}) => {
  const [superhero, setSuperhero] = useState<ISuperhero | undefined>(
    initialSuperhero
  );
  const [updatedData, setUpdatedData] = useState<ISuperhero>({
    nickname: initialSuperhero?.nickname || "",
    real_name: initialSuperhero?.real_name || "",
    origin_description: initialSuperhero?.origin_description || "",
    superpowers: initialSuperhero?.superpowers || [],
    catch_phrase: initialSuperhero?.catch_phrase || "",
    images: initialSuperhero?.images || [],
  });

  useEffect(() => {
    setSuperhero(initialSuperhero);
    setUpdatedData({
      nickname: initialSuperhero?.nickname || "",
      real_name: initialSuperhero?.real_name || "",
      origin_description: initialSuperhero?.origin_description || "",
      superpowers: initialSuperhero?.superpowers || [],
      catch_phrase: initialSuperhero?.catch_phrase || "",
      images: initialSuperhero?.images || [],
    });
  }, [initialSuperhero]);

  if (!initialSuperhero) {
    return <div>Error fetching superhero data</div>;
  }

  const [updateSuperhero, { isLoading: updateLoading }] =
    useUpdateSuperheroMutation();

  useEffect(() => {
    if (superhero) {
      setUpdatedData(superhero);
    }
  }, [superhero]);

  if (!superhero) {
    return <div>Error fetching superhero data</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "images" || name === "superpowers") {
      const valuesArray = value.split(",").map((item) => item.trim());
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: valuesArray,
      }));
    } else {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateSuperhero = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (superhero && superhero._id) {
      try {
        await updateSuperhero({
          _id: superhero._id,
          superhero: updatedData,
        }).unwrap();

        setUpdatedData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));

        const response = await axios.get<ISuperhero>(
          `http://localhost:5000/api/superheroes/${superhero._id}`
        );
        const updatedSuperhero = response.data;

        setSuperhero(updatedSuperhero);

        setUpdatedData({
          nickname: "",
          real_name: "",
          origin_description: "",
          superpowers: [],
          catch_phrase: "",
          images: [],
        });
      } catch (error) {
        console.log("Failed to update superhero", error);
      }
    }
  };

  return (
    <main className="bg-[#121212] min-w-screen min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 flex justify-between">
        <div className="flex justify-between flex-col w-3/5">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-green-600">
              {superhero.nickname}
            </h1>
            <p className="text-lg mb-2 font-bold">
              Real Name:{" "}
              <span className="text-gray-400">{superhero.real_name}</span>
            </p>
            <p className="text-lg mb-2 font-bold">
              Origin Description:{" "}
              <span className="text-gray-400">
                {superhero.origin_description}
              </span>
            </p>
            <p className="text-lg mb-2 font-bold">
              Superpowers:{" "}
              <span className="text-gray-400">
                {superhero.superpowers.join(", ")}
              </span>
            </p>
            <p className="text-lg mb-2 font-bold">
              Catch Phrase:{" "}
              <span className="text-gray-400"> {superhero.catch_phrase}</span>
            </p>
          </div>
          <div className="flex flex-col justify-center mt-4 gap-4">
            <p className="font-bold text-green-400">Images of this hero:</p>
            <div className="flex">
              {superhero.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Superhero Image ${index}`}
                  className="w-80 h-80 object-cover rounded-lg mx-2"
                  width={320}
                  height={320}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-white w-1/5">
          <form onSubmit={handleUpdateSuperhero}>
            <InputField
              label="Nickname"
              id="nickname"
              name="nickname"
              type="text"
              value={updatedData.nickname}
              onChange={handleInputChange}
            />

            <InputField
              label="Real Name"
              id="real_name"
              name="real_name"
              type="text"
              value={updatedData.real_name}
              onChange={handleInputChange}
            />

            <InputField
              label="Origin Description"
              id="origin_description"
              name="origin_description"
              type="text"
              value={updatedData.origin_description}
              onChange={handleInputChange}
            />

            <InputField
              label="Superpowers (separated by commas)"
              id="superpowers"
              name="superpowers"
              type="text"
              value={updatedData.superpowers.join(", ")}
              onChange={handleInputChange}
            />

            <InputField
              label="Catch Phrase"
              id="catch_phrase"
              name="catch_phrase"
              type="text"
              value={updatedData.catch_phrase}
              onChange={handleInputChange}
            />

            <InputField
              label="Images (separated by commas)"
              id="images"
              name="images"
              type="text"
              value={updatedData.images.join(", ")}
              onChange={handleInputChange}
            />

            <button
              className="text-lg bg-orange-400 p-2 rounded-md text-white mt-4 font-bold"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <Link
        href="/"
        className="bg-green-400 rounded-md p-2 text-black ml-44 font-bold"
      >
        Go back
      </Link>
    </main>
  );
};

export default SuperheroPage;
