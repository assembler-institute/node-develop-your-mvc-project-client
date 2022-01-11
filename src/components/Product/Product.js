import React from "react";
import { Link } from "react-router-dom";

function Product({ title, price, category, image, id }) {
  return (
    <>
      <article className="overflow-hidden rounded-lg shadow-lg">
        <div>
          <Link to={`/${id}`}>
            <img
              alt="Placeholder"
              className="block h-auto w-full object-contain max-h-60"
              src={image}
            />
          </Link>
        </div>
        <header className="flex items-center justify-between leading-tight p-2 md:p-4 w-full">
          <h1 className="text-md">
            <Link
              to={`/${id}`}
              className="no-underline hover:underline text-black"
            >
              {title}
            </Link>
          </h1>
          <p className="text-grey-darker text-sm text-black-400 font-bold w-28 text-right">
            {price} €
          </p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4 w-full">
          <Link
            to={"/"}
            className="flex items-center no-underline hover:underline text-black"
          >
            <p className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-blue-600 rounded-full">
              {category}
            </p>
          </Link>
          <Link
            to={"/"}
            className="no-underline text-grey-darker hover:text-red-dark"
          >
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </Link>
        </footer>
      </article>
    </>
  );
}

export default Product;
