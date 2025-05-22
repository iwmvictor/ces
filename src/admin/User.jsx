import React, { useState, useEffect } from "react";
import { IoAdd, IoClose, IoRefresh, IoSearch } from "react-icons/io5";
import { citizens } from "../assets/asset";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  CgChevronDoubleLeft,
  CgChevronDoubleRight,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import Modal from "react-modal";

const AdminUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isViewModelOpen, setIsViewModelOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const usersPerPage = 20;

  // Handle select - deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(citizens.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle select specific user
  const handleUserSelect = (e, userId) => {
    if (e.target.checked) {
      setSelectedUsers((prev) => [...prev, userId]);
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    }
  };

  // View modal
  const openViewModal = (user) => {
    setCurrentUser(user);
    setIsViewModelOpen(true);
  };

  // Edit modal
  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  // Delete user
  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDeleteUser = () => {
    alert(`User ${currentUser.name} deleted!`);
    setIsDeleteModalOpen(false);
  };

  // Search filtering logic
  const filteredUsers = citizens.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <>
      <div className="admin-users">
        <div className="container">
          <div className="content">
            <div className="title">
              <div className="text">
                <h2>Customers</h2>
                <p>Manage your system user</p>
              </div>
              <div className="buttons">
                <button>
                  <span>
                    <IoAdd />
                  </span>
                  <span>Register User</span>
                </button>
              </div>
            </div>
            <div className="user-list">
              <div className="list-title">
                <div className="search">
                  <div className="input">
                    <input
                      type="search"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                    <button>
                      <IoSearch />
                    </button>
                  </div>
                </div>
              </div>
              <div className="user-items">
                <div className="item-header">
                  <div className="item-h">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedUsers.length === filteredUsers.length}
                    />
                  </div>
                  <div className="item-h">
                    <span>Citizen</span>
                  </div>
                  <div className="item-h">
                    <span>Email</span>
                  </div>
                  <div className="item-h">
                    <span>Phone</span>
                  </div>
                  <div className="item-h">
                    <span>Action</span>
                  </div>
                </div>
                {currentUsers.map((item, index) => (
                  <div className="user-item" key={index}>
                    <div className="user__item">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(item.id)}
                        onChange={(e) => handleUserSelect(e, item.id)}
                      />
                    </div>
                    <div className="user__name user__item">
                      <span>
                        <img src={item.profileImage} alt="" />
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <div className="user__item">
                      <span>{item.email}</span>
                    </div>
                    <div className="user__item">
                      <span>{item.phone}</span>
                    </div>
                    <div className="user__action user__item">
                      <button onClick={() => openViewModal(item)}>
                        <FaRegEye />
                      </button>
                      <button onClick={() => openEditModal(item)}>
                        <CiEdit />
                      </button>
                      <button onClick={() => handleDeleteUser(item)}>
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pagination">
              <div className="div">
                <button onClick={() => setCurrentPage(1)}>
                  <CgChevronDoubleLeft />
                </button>
                <button onClick={() => setCurrentPage(currentPage - 1)}>
                  <CgChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)}>
                  <CgChevronRight />
                </button>
                <button onClick={() => setCurrentPage(totalPages)}>
                  <CgChevronDoubleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={isViewModelOpen}
        onRequestClose={() => setIsViewModelOpen(false)}
        contentLabel="View User"
        className="modal"
      >
        <div className="overlay"></div>
        <div className="content">
          <h2>{currentUser?.name}</h2>
          <p>
            <span>Email:</span>
            <span>{currentUser?.email}</span>
          </p>
          <p>
            <span>Phone:</span>
            <span>{currentUser?.phone}</span>
          </p>
          <button className="close" onClick={() => setIsViewModelOpen(false)}>
            <IoClose />
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit User"
        className="modal"
      >
        <div className="overlay"></div>
        <div className="content">
          <h2>Edit {currentUser?.name}</h2>
          <form>
            <input
              type="text"
              placeholder="Name"
              defaultValue={currentUser?.name}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={currentUser?.email}
            />
            <input
              type="phone"
              placeholder="Phone"
              defaultValue={currentUser?.phone}
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
        <button className="close" onClick={() => setIsEditModalOpen(false)}>
          x
        </button>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete User"
        className="modal"
      >
        <div className="overlay"></div>
        <div className="content">
          <h2>Are you sure you want to delete {currentUser?.name}?</h2>
          <button onClick={confirmDeleteUser}>Yes, Delete</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default AdminUsers;