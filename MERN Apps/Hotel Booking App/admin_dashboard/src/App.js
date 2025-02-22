/* eslint-disable react/no-unstable-nested-components */
import { useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Home from './Components/Home/Home';
import { Contexts } from './ContextUser/Contexts';
import AddHotel from './Pages/AddHotel/AddHotel';
import AddNew from './Pages/AddNew/AddNew';
import AddRoom from './Pages/AddRoom/AddRoom';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Blogs from './Pages/Blogs/Blogs';
import Detail from './Pages/Detail/Detail';
import Hotels from './Pages/Hotels/Hotels';
import Login from './Pages/Login/Login';
import Rooms from './Pages/Rooms/Rooms';
import Lists from './Pages/UserLists/UserLists';
import './app.scss';

// Dynamicaly change the data for different pages
const userInpDetails = [
    {
        id: 2,
        name: 'username',
        lable: 'Username',
        type: 'text',
        placeholder: 'John23',
        required: true,
        pattern: '^[A-Za-z0-9]{3,12}$',
        errorMsg: 'Username should be 3-12 characters & should not include any special character!',
    },
    {
        id: 3,
        name: 'fullname',
        lable: 'Fullname',
        type: 'text',
        placeholder: 'John Smith',
        required: true,
        errorMsg: 'Name is required!',
    },
    {
        id: 4,
        name: 'email',
        lable: 'Email',
        type: 'email',
        placeholder: 'example@email.com',
        required: true,
        errorMsg: 'Enter a valid email!',
    },
    {
        id: 5,
        name: 'password',
        lable: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true,
        pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
        errorMsg:
            'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
    },
    {
        id: 6,
        name: 'country',
        lable: 'Address',
        type: 'text',
        placeholder: 'Address',
        required: true,
        errorMsg: 'Address is required!',
    },
];
const productInpDetails = [
    {
        id: 2,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Product title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 3,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Product description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 4,
        name: 'category',
        lable: 'Category',
        type: 'text',
        placeholder: 'Product category',
        required: true,
        errorMsg: 'Category is required!',
    },
    {
        id: 5,
        name: 'price',
        lable: 'Price',
        type: 'number',
        placeholder: 'Product price',
        required: true,
        errorMsg: 'Price is required!',
    },
    {
        id: 6,
        name: 'stock',
        lable: 'In Stock',
        type: 'text',
        placeholder: 'In Stock',
        required: true,
        errorMsg: 'This field is required!',
    },
];
const blogInpDetails = [
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Blog title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'desc',
        lable: 'Description',
        type: 'text',
        placeholder: 'Blog description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'tags',
        lable: 'Tags',
        type: 'text',
        placeholder: 'Travel, Tourist, Communication',
        required: true,
        errorMsg: 'Tag is required!',
    },
];
const hotelInpDetails = [
    {
        id: 6,
        name: 'name',
        lable: 'Name',
        type: 'text',
        placeholder: 'Hotel Name',
        required: true,
        errorMsg: 'Name is required!',
    },
    {
        id: 7,
        name: 'type',
        lable: 'Type',
        type: 'text',
        placeholder: 'Hotel, Resort',
        required: true,
        errorMsg: 'Type is required!',
    },
    {
        id: 8,
        name: 'city',
        lable: 'City',
        type: 'text',
        placeholder: 'City',
        required: true,
        errorMsg: 'City is required!',
    },
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Hotel title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'desc',
        lable: 'Description',
        type: 'text',
        placeholder: 'Hotel description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'price',
        lable: 'Price',
        type: 'number',
        placeholder: 'Hotel price',
        min: 10,
        max: 1000,
        required: true,
        errorMsg: 'Price should be between $ 10-1000!',
    },
    {
        id: 4,
        name: 'rooms',
        lable: 'Room',
        type: 'number',
        min: 1,
        max: 10,
        placeholder: 'Total rooms',
        required: true,
        errorMsg: 'Room should be between 1-10!',
    },
    {
        id: 5,
        name: 'rating',
        lable: 'Rating',
        type: 'number',
        placeholder: 'Rating',
        min: 5,
        max: 10,
        required: true,
        errorMsg: 'Rating should be between 5-10!',
    },
];
const roomInpDetails = [
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Hotel title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'desc',
        lable: 'Description',
        type: 'text',
        placeholder: 'Hotel description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'price',
        lable: 'Price',
        type: 'number',
        placeholder: 'Hotel price',
        min: 10,
        max: 1000,
        required: true,
        errorMsg: 'Price should be between $ 10-1000!',
    },
    {
        id: 4,
        name: 'maxPeople',
        lable: 'Max people',
        type: 'number',
        min: 1,
        max: 5,
        placeholder: 'Total rooms',
        required: true,
        errorMsg: 'Room should be between 1-10!',
    },
];

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);
    const [state, setState] = useState(false);

    // create protected route
    /**
     * The ProtectedRoute function checks if a user is logged in and redirects to the login page if not,
     * otherwise it renders the children components.
     * @returns The children component is being returned.
     */
    function ProtectedRoute({ children }) {
        const { user } = useContext(Contexts);
        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    }

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="login" element={<Login />} />
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        {/* nested users routes */}
                        <Route path="users">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Lists type="user" />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    <ProtectedRoute>
                                        <Detail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    <ProtectedRoute>
                                        <AddNew
                                            inputs={userInpDetails}
                                            title="Add New User"
                                            type="USER"
                                        />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested hotel routes */}
                        <Route path="hotels">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Hotels type="room" />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":hotelId"
                                element={
                                    <ProtectedRoute>
                                        <BlogDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    <ProtectedRoute>
                                        <AddHotel
                                            inputs={hotelInpDetails}
                                            title="Add New Hotel"
                                            type="HOTEL"
                                        />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested hotel routes */}
                        <Route path="rooms">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Rooms type="room" />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":roomId"
                                element={
                                    <ProtectedRoute>
                                        <BlogDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    <ProtectedRoute>
                                        <AddRoom
                                            inputs={roomInpDetails}
                                            title="Add New Room"
                                            type="ROOM"
                                        />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested blogs routes */}
                        <Route path="blogs">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Blogs type="blog" />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":blogId"
                                element={
                                    <ProtectedRoute>
                                        <BlogDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    <ProtectedRoute>
                                        <AddNew
                                            inputs={blogInpDetails}
                                            title="Create New Blog"
                                            type="BLOG"
                                        />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested product routes */}
                        <Route path="orders">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Lists type="product" />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
