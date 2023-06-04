import { useGetSuperheroesQuery } from "../api/api";
import { useState } from "react";
import AddSuperheroModal from "./AddSuperheroModal";
import SuperheroItem from "./SuperheroItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "@/superhero/superhero.slice";
import { useTypedSelector } from "@/store";

const SuperheroesList: React.FC = () => {
  const { data: superheroes, isLoading, isError } = useGetSuperheroesQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = useTypedSelector(selectCurrentPage);
  const dispatch = useDispatch();

  const perPage = 5;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedSuperheroes = superheroes?.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching superheroes</div>;
  }

  return (
    <div>
      <h1 className="text-xl mb-4 font-bold">Superheroes List</h1>
      <button
        type="button"
        className="bg-lime-700 text-white rounded-md px-4 py-2 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Superhero
      </button>

      <AddSuperheroModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ul className="flex w-full gap-4 items-center justify-center">
        {paginatedSuperheroes?.map((superhero) => (
          <SuperheroItem key={superhero._id} superhero={superhero} />
        ))}
      </ul>
      <div className="flex justify-center mt-4 items-center">
        <button
          className="bg-gray-300 text-gray-700 rounded-l-md px-4 py-2 disabled:opacity-50 w-28 font-bold disabled:font-normal"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 font-bold">{currentPage}</span>
        <button
          className="bg-gray-300 text-gray-700 rounded-r-md px-4 py-2 disabled:opacity-50 w-28 font-bold disabled:font-normal"
          onClick={handleNextPage}
          disabled={!superheroes || endIndex >= superheroes.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SuperheroesList;
