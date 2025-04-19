import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import axios from '../../axiosConfig';
import { useSelector } from "react-redux";
export default function CartProduct({ _id, name, images, quantity, price }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [quantityVal, setQuantityVal] = useState(quantity);

	const email = useSelector((state) => state.user.email);


	useEffect(() => {
		if (!images || images.length === 0) return;
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 2000);
		return () => clearInterval(interval);
	}, [images]);

	const handleIncrement = () => {
		const newquantityVal = quantityVal + 1;
		setQuantityVal(newquantityVal);
		updateQuantityVal(newquantityVal);
	};

	const handleDecrement = () => {
		const newquantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
		setQuantityVal(newquantityVal);
		updateQuantityVal(newquantityVal);
	};

	
	const updateQuantityVal = async (quantity) => {
		try {
		  const res = await axios.put("/api/v2/product/cartproduct/quantity", {
			email, 
			productId: _id,
			quantity,
		  });
		  console.log("Quantity updated:", res.data);
		} catch (err) {
		  console.error("Error updating quantity:", err);
		}
	  };

	// const updateQuantityVal = (quantity) => {
	// 	fetch('http://localhost:8000/api/v2/product/cartproduct/quantity', {
	// 		method: 'PUT',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			email: 'sibi123@gmail.com',
	// 			productId: _id,
	// 			quantity,
	// 		}),
	// 	})
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error(`HTTP error! status: ${res.status}`);
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			console.log('quantityVal updated:', data);
	// 		})
	// 		.catch((err) => {
	// 			console.error('Error updating quantityVal:', err);
	// 		});
	// };

	const currentImage = images && images.length > 0 ? images[currentIndex] : "";
	return (
		<div className="h-max w-full p-4 flex justify-between border-b border-neutral-300 bg-neutral-100 rounded-lg">
			<div className="flex flex-col gap-y-2">
				<img
					src={`https://ecommerce-online-store-backend.onrender.com${currentImage}`} // Ensure the URL is correct\
					alt={name}
					className="w-32 h-32 object-cover rounded-lg border border-neutral-300"
				/>
			</div>
			<div className="w-full flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center px-4">
				<p className="text-lg font-semibold">{name}</p>
				<p className="text-lg font-semibold">${price * quantityVal}</p>
				<div className="hidden md:flex flex-row items-center gap-x-2 ">
					<div
						onClick={handleIncrement}
						className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
					>
						<IoIosAdd />
					</div>
					<div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
						{quantityVal}
					</div>
					<div
						onClick={handleDecrement}
						className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
					>
						<IoIosRemove />
					</div>
				</div>
			</div>

		</div>
	);
}