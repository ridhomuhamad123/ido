import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, columDb, buttonData, endpoints, columnDetail, judulModalEdit, inputData }) {
    console.log(dataTd);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [endpointsReplaced, setEndpointReplaced] = useState({});
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [inbounds, setInbound] = useState({}); 
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);

    const navigate = useNavigate();

    function handleModalDelete(id) {
        const endpointDetail = endpoints['detail'];
        const endpointDelete = endpoints['delete'];

        const detailReplaced = endpointDetail.replace('{id}', id);
        const deleteReplaced = endpointDelete.replace('{id}', id);

        const replace = {
            "detail": detailReplaced,
            "delete": deleteReplaced
        }

        setEndpointReplaced(replace);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const endpointsDetail = endpoints['detail'];
        const endpointsUpdate = endpoints['update'];
        const detailReplaced = endpointsDetail.replace('{id}', id);
        const updateReplaced = endpointsUpdate.replace('{id}', id);
        const replaced = {
            "detail": detailReplaced,
            "update": updateReplaced
        }
        setEndpointReplaced(replaced);
        setIsOpenModalEdit(true);
    }

    function handleModalAdd() {
        const replaced = {
            "store": endpoints['store']
        }
        setEndpointReplaced(replaced);
        setIsOpenModalAdd(true);
    }

    function handleRestore(id) {
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                navigate('/stuffs');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="mt-6"> {/* Add margin-top for space */}
                <br></br>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
                    {
                        buttonData.includes("create") ? (
                            <button onClick={handleModalAdd} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-green-500 border border-gray-200 rounded-lg hover:bg-green-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 dark:bg-green-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-700">
                                Create
                            </button>
                        ) : ''
                    }
                    {
                        buttonData.includes("trash") ? (
                            <Link to={'/stuffs/trash'} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-500 border border-gray-200 rounded-lg hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-200 dark:bg-yellow-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-yellow-700 dark:hover:text-white dark:focus:ring-yellow-700">
                                Trash
                            </Link>
                        ) : ''
                    }
                    <br />
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {dataTh.map((data, index) => (
                                    <th scope="col" className="px-6 py-3" key={index}>
                                        {data}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {Object.entries(dataTd || {}).map(([index, value]) => (
                                <tr className="bg-white border-b dark:border-gray-700" key={index}>
                                    <td className="px-6 py-4 text-right">{parseInt(index) + 1}.</td>

                                    {Object.entries(columDb).map(([i, v]) => (
                                        <td className="px-6 py-4" key={i}>
                                            {!v
                                                ? value[i]
                                                : value[i.replace(/[!@#$%^&*]/, "")]
                                                    ? value[i.replace(/[!@#$%^&*]/, "")][v]
                                                    : "0"}
                                        </td>
                                    ))}
                                    {
                                        buttonData.includes('edit') ? (
                                            <a
                                                onClick={() => handleModalEdit(value.id)}
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit{" "}
                                            </a>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes('delete') ? (
                                            <a
                                                onClick={() => handleModalDelete(value.id)}
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Delete{" "}
                                            </a>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes('restore') ? (
                                            <a
                                                href="#" onClick={() => handleRestore(value.id)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-1"
                                            >
                                                Restore
                                            </a>
                                        ) : ''
                                    }
                                    {
                                        buttonData.includes('permanent-delete') ? (
                                            <a
                                                href="#"
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                                            >
                                                Permanent-Delete
                                            </a>
                                        ) : ''
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointsReplaced} columnDetail={columnDetail} />
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced} />
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced} />
        </>
    );
}
