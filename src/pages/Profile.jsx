import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Profile() {
    const [dataProfile, setDataProfile] = useState({});
    const [isBlack, setIsBlack] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setDataProfile(res.data.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully logged in!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/profile');
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();

    function handleLogout() {
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                localStorage.removeItem('access_token');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    function DarkMode() {
        setIsBlack(!isBlack);
    }


    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className={`w-full max-w-sm border rounded-lg shadow ${isBlack ? 'bg-black' : 'bg-white'} border-gray-200 dark:${isBlack ? 'bg-black' : 'bg-gray-800'} dark:border-gray-700`}>
                    <div className="flex flex-col items-center pb-10">
                        <h5 className={`mb-1 text-xl font-medium ${isBlack ? 'text-white' : ''} dark:text-white`}>{dataProfile.username}</h5>
                        <span className={`text-sm ${isBlack ? 'text-gray-400' : 'text-gray-500'} dark:text-gray-400`}>{dataProfile.email}</span>
                        <div className="flex mt-4 md:mt-6">
                            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dashboard</a>
                            <a onClick={handleLogout} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</a>
                        </div>
                        <button onClick={DarkMode} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            DarkMode
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
