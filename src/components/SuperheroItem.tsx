import { useDeleteSuperheroMutation } from "@/api/api";
import { ISuperhero } from "@/superhero/superhero.slice";
import Image from "next/image";
import Link from "next/link";

interface SuperheroItemProps {
  superhero: ISuperhero;
}

const SuperheroItem: React.FC<SuperheroItemProps> = ({ superhero }) => {
  const [deleteSuperhero, { isLoading: deleteLoading }] =
    useDeleteSuperheroMutation();

  const handleDeleteSuperhero = async (superheroId: string) => {
    try {
      await deleteSuperhero(superheroId).unwrap();
    } catch (error) {
      console.error("Failed to delete superhero", error);
    }
  };

  return (
    <li className="w-1/5">
      <div className="bg-gray-700 my-4 p-4 rounded-lg text-white flex flex-col items-center justify-center">
        <Link href={`/superheroes/${superhero._id}`}>
          <Image
            src={superhero.images[0]}
            alt={superhero.nickname}
            className="w-40 h-40 object-cover rounded-full mb-4"
            width={160}
            height={160}
          />
          <h2 className="font-bold text-lg">{superhero.nickname}</h2>
        </Link>
        <button
          className="text-lg bg-orange-700 p-2 rounded-md text-white mt-4"
          onClick={() => superhero._id && handleDeleteSuperhero(superhero._id)}
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
};

export default SuperheroItem;
