// import React, { useEffect, useState } from "react";
// import { PiKeyReturnBold } from "react-icons/pi";
// import { FaSquareCheck } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
// import { toast } from "react-toastify";
// import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
// import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
// import ReturnBookPopup from "../popups/ReturnBookPopup";
// import Header from "../layout/Header";

// const Catalog = () => {
//   const dispatch = useDispatch();

//   const {returnBookPopup} = useSelector(state => state.popup);
//   const { loading, error, allBorrowedBooks, message } = useSelector(state => state.borrow);

//   const [filter, setFilter] = useState("borrowed");

//   const formatDateAndTime = (timeStamp)=>{
//       //console.log(typeof timeStamp);
//       const date = new Date(timeStamp);
//       const formattedDate =`${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}` ;
//       const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}` ;
//       const result = `${formattedDate} ${formattedTime}` ;
//       return result;
//       // console.log(typeof date);
//   };

//   const formatDate = (timeStamp)=>{
//       //console.log(typeof timeStamp);
//       const date = new Date(timeStamp);
//       return `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`;
//       // console.log(typeof date);
//   };

//   const currentDate = new Date();

//   const borrowedBooks = allBorrowedBooks?.filter( (book) => {
//     const dueDate = new Date(book.dueDate);
//     return dueDate > currentDate;
//   });

//   const overdueBooks = allBorrowedBooks?.filter((book) => {
//     const dueDate = new Date(book.dueDate);
//     return dueDate <= currentDate;
//   });

//   const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

//   const [email, setEmail] = useState("");
//   const [borrowedBookId, setBorrowedBookId] = useState("");
//   const openReturnBookPopup = (bookId, email) => {
//     setBorrowedBookId(bookId);
//     setEmail(email);
//     dispatch(toggleReturnBookPopup());
//   };

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//       dispatch(fetchAllBooks());
//       dispatch(fetchAllBorrowedBooks());
//       dispatch(resetBookSlice());
//       dispatch(resetBorrowSlice());
//     }
//     if (error) {
//       toast.error(error);
//       dispatch(resetBorrowSlice());

//     }
//   }, [dispatch, error, loading]);

//   return <>
//     <main className="relative flex-1 p-6 pt-28">
//       <Header/>
//       {/* Sub Header */}
//       {/* <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
//         <h2 className="text-xl font-medium md:text-2xl md:font-semibold">Borrowed Books</h2>
//       </header> */}

//       <header className="flex flex-col gap-3 sm:flex-row md:items-center">
//         <button className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${filter === "borrowed" ? "bg-black text-white border-black" : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"}`} onClick={()=>setFilter("borrowed")}>Borrowed Books</button>
//         <button className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${filter === "overdue" ? "bg-black text-white border-black" : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"}`} onClick={()=>setFilter("overdue")}>Overdue Borrowers</button>
//       </header>

//         {
//           booksToDisplay &&  booksToDisplay.length>0 ? (
//             <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
//               <table className="min-w-full border-collapse">
//                 <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2 text-left">ID</th>
//                   <th className="px-4 py-2 text-left">Username</th>
//                   <th className="px-4 py-2 text-left">Email</th>
//                   <th className="px-4 py-2 text-left">Price</th>
//                   <th className="px-4 py-2 text-left">Due Date</th>
//                   <th className="px-4 py-2 text-left">Date & Time</th>
//                   <th className="px-4 py-2 text-left">Return</th>

//                 </tr>
//                 </thead>

//                 <tbody>
//                   {
//                     booksToDisplay.map((book, index)=>(
//                       <tr key={index} className={(index+1)%2 === 0 ? "bg-gray-50" : ""}>
//                         <td className="px-4 py-2">{index+1}</td>
//                         <td className="px-4 py-2">{book?.user.name}</td>
//                         <td className="px-4 py-2">{book?.user.email}</td>
//                         <td className="px-4 py-2">{book?.price}</td>
//                         <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
//                         <td className="px-4 py-2">{formatDateAndTime(book.createdAt)}</td>
//                         <td className="px-4 py-2">{book.returnDate ? ( <FaSquareCheck className="w-6 h-6"/>) : (<PiKeyReturnBold onClick={()=> openReturnBookPopup(book.book, book?.user.email)} className="w-6 h-6" />) }</td>
//                       </tr>
//                     ))
//                   }
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <h3 className="text-3xl mt-5 font-medium">No {filter === "borrowed" ? "borrowed" : "overdue"} books found!</h3>
//           )
//         }
//     </main>
//         {returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email} />}
//   </>;
// };

// export default Catalog;

import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import Header from "../layout/Header";

const Catalog = () => {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector(state => state.popup);
  const { loading, error, allBorrowedBooks, message } = useSelector(state => state.borrow);

  const [filter, setFilter] = useState("borrowed");

  const formatDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, 0)}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getFullYear())}`;
  };

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });

  const overdueBooks = allBorrowedBooks?.filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  });

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, loading]);

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 text-[#001F3F]"> {/* ✅ Updated text color */}
        <Header />

        {/* FILTER BUTTONS */}
        <header className="flex flex-col gap-3 sm:flex-row md:items-center">
          <button
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "borrowed"
                ? "bg-[#001F3F] text-white border-[#001F3F]" // ✅ Updated color
                : "bg-gray-200 text-black border-gray-200 hover:bg-[#003366]" // ✅ Updated hover
            }`}
            onClick={() => setFilter("borrowed")}
          >
            Borrowed Books
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "overdue"
                ? "bg-[#001F3F] text-white border-[#001F3F]" // ✅ Updated color
                : "bg-gray-200 text-black border-gray-200 hover:bg-[#003366] hover:text-white" // ✅ Updated hover
            }`}
            onClick={() => setFilter("overdue")}
          >
            Overdue Borrowers
          </button>
        </header>

        {/* BOOK TABLE */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            {/* <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Date & Time</th>
                  <th className="px-4 py-2 text-left">Return</th>
                </tr>
              </thead>

              <tbody>
                {booksToDisplay.map((book, index) => (
                  <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book?.user.name}</td>
                    <td className="px-4 py-2">{book?.user.email}</td>
                    <td className="px-4 py-2">{book?.price}</td>
                    <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
                    <td className="px-4 py-2">{formatDateAndTime(book.createdAt)}</td>
                    <td className="px-4 py-2">
                      {book.returnDate ? (
                        <FaSquareCheck className="w-6 h-6 text-[#001F3F]" /> // ✅ Updated icon color
                      ) : (
                        <PiKeyReturnBold
                          onClick={() => openReturnBookPopup(book.book, book?.user.email)}
                          className="w-6 h-6 cursor-pointer text-[#001F3F]" // ✅ Updated icon color
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

            <table className="min-w-full border-collapse text-[#001F3F]"> {/* ✅ Updated text color */}
              <thead>
    <tr className="bg-[#001F3F] text-white"> {/* ✅ Header background */}
      <th className="px-4 py-2 text-left">ID</th>
      <th className="px-4 py-2 text-left">Username</th>
      <th className="px-4 py-2 text-left">Email</th>
      <th className="px-4 py-2 text-left">Price</th>
      <th className="px-4 py-2 text-left">Due Date</th>
      <th className="px-4 py-2 text-left">Date & Time</th>
      <th className="px-4 py-2 text-left">Return</th>
    </tr>
  </thead>

  <tbody>
    {booksToDisplay.map((book, index) => (
      <tr
        key={index}
        className={`${
          (index + 1) % 2 === 0 ? "bg-[#f5faff]" : "bg-white"
        } hover:bg-[#e6f0ff] transition-colors`} // ✅ Alternating + hover
      >
        <td className="px-4 py-2 border-t border-gray-100">{index + 1}</td>
        <td className="px-4 py-2 border-t border-gray-100">{book?.user.name}</td>
        <td className="px-4 py-2 border-t border-gray-100">{book?.user.email}</td>
        <td className="px-4 py-2 border-t border-gray-100">{book?.price}</td>
        <td className="px-4 py-2 border-t border-gray-100">{formatDate(book.dueDate)}</td>
        <td className="px-4 py-2 border-t border-gray-100">{formatDateAndTime(book.createdAt)}</td>
        <td className="px-4 py-2 border-t border-gray-100">
          {book.returnDate ? (
            <FaSquareCheck className="w-6 h-6 text-[#001F3F]" />
          ) : (
            <PiKeyReturnBold
              onClick={() => openReturnBookPopup(book.book, book?.user.email)}
              className="w-6 h-6 cursor-pointer text-[#001F3F]"
            />
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">
            No {filter === "borrowed" ? "borrowed" : "overdue"} books found!
          </h3>
        )}
      </main>

      {returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email} />}
    </>
  );
};

export default Catalog;

