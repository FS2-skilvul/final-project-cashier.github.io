import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/navbar-admin';
import { useState } from 'react';
import TableDashboardAdmin from '../../components/table-dashboard-admin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDataUser } from '../../redux/reducers/user-reducers';

function AdminDashboard() {
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [value, setValue] = useState([
		{
			no: 1,
			nama: 'Minyak',
			kode: '#123',
			beli: 45.0,
			jual: 1,
			stok: 1,
			id: 1,
		},
	]);

	const { users } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// const [filteredValue, setFilteredValue] = useState([]);

	useEffect(() => {
		dispatch(getAllDataUser());
	}, [dispatch]);

	// Searching data
	const searchBar = (e) => {
		setSearch(e.target.value);
		setCurrentPage(1);
	};

	const filteredValue = users.filter((item) => {
		if (!search || search === '') {
			return item.role != "admin";
		}
		const searchLower = search.toLowerCase();
		const itemNameLower = item.nama.toLowerCase();

		return (
			itemNameLower.includes(searchLower) && item.role != "admin"
		);
	});

	const nextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const prevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const totalItems = filteredValue.length;
	const indexOfLastValue = currentPage * 8;
	const indexOfFirstValue = indexOfLastValue - 8;
	const currentValues = filteredValue.slice(
		indexOfFirstValue,
		indexOfLastValue,
	);
	let tableContent;

	// Menampilkan data
	if (currentValues.length > 0) {
		tableContent = currentValues.map((item, index) => (
			<TableDashboardAdmin
				key={item.id}
				no={index + 1}
				nama={item.nama}
				nama_toko={item.nama_toko}
				alamat_toko={item.alamat_toko}
				id={item.id}
			/>
		));
	} else {
		tableContent = (
			<tbody>
				<tr>
					<td colSpan="8" className="text-center p-4">
						Data tidak ditemukan
					</td>
				</tr>
			</tbody>
		);
	}
	return (
		<div className="relative flex flex-col items-center w-full h-screen bg-[#F2F4F9] pt-10 pb-12 px-3">
			<NavbarAdmin />
			<div className="flex flex-col w-full lg:w-[1040px] items-center space-y-10 mt-6 mb-9">
				<div className="flex w-full justify-center mt-9 px-4 py-2 md:py-4 lg:py-9 bg-primary text-white font-bold text-base sm:text-xl md:text-3xl shadow-2xl shadow-gray-300">
					Selamat Datang Admin, Ini Adalah Daftar User Kasir Online
				</div>
			</div>
			<main className='w-full max-w-[65em] h-auto'>
				<section className="w-full h-full border border-t-black border-x-black rounded-t-lg">
					<div className="flex justify-center md:justify-start w-full py-2 bg-primary items-center">
						<p className="ml-8 font-bold text-white text-xl">DAFTAR USER</p>
					</div>
					<div className='px-4 sm:px-8 pb-8 border bg-white border-t-black border-x-black h-full'>
						<div className='w-full justify-center sm:justify-between items-center py-3'>
							<div className='flex justify-start sm:justify-end mb-4 sm:mb-0'>
								<input
									type="text"
									className=" border-2 border-black rounded px-8  sm:w-fit py-1 h-fit"
									value={search}
									onChange={searchBar}
									placeholder="Cari Nomor Transaksi"
								></input>
							</div>
						</div>
						<div className='flex flex-col h-full justify-between space-y-9 '>
							<div className='overflow-x-auto'>
								<div className="w-[900px] md:w-full  flex justify-center">
									<table className="table-auto border-collapse w-full border-r-2 border-l-2 border-b-2">
										<thead className="text-center bg-primary text-white ">
											<tr>
												<th className="px-2 py-2 border-2">No</th>
												<th className="px-2 py-2 border-2">Nama</th>
												<th className="px-2 py-2 border-2">Nama Toko</th>
												<th className="px-2 py-2 border-2">Alamat Toko</th>
												<th className="px-2 py-2 border-2">Cashflow</th>
												<th className="px-2 py-2 border-2">Stok Barang</th>
												<th className="px-2 py-2 border-2">Laporan Transaksi</th>
											</tr>
										</thead>
										{tableContent}
									</table>
								</div>
							</div>

						</div>
					</div>
					<div className="flex bg-primary w-full h-auto items-center py-2 px-8 rounded-b-lg border-b border-x border-black ">
						<div className="grid sm:grid-cols-2 gap-2 w-full justify-center sm:justify-between items-center">
							<div className='w-full'>
								<p className="flex text-center text-white ">
									{indexOfFirstValue + 1} -{' '}
									{Math.min(indexOfLastValue, totalItems)} data | Halaman{' '}
									{currentPage} | Jumlah Barang : {totalItems}
								</p>
								<p></p>
							</div>
							<div className="flex w-full items-center justify-center sm:justify-end gap-2">
								<button
									onClick={prevPage}
									disabled={currentPage === 1}
									className="px-4 py-1 text-blue-500 bg-white rounded"
								>
									Previous
								</button>
								<button
									onClick={nextPage}
									disabled={currentValues.length < 8}
									className="px-4 py-1 text-blue-500 bg-white rounded"
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default AdminDashboard;
