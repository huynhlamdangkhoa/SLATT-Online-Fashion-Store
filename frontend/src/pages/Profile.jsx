import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import s from "../css/pages/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { useProfileStore } from "../store/profileStore.js";

function Profile() {
    const { getUserProfile, updateUserProfile, isLoading, profile, error, message } = useProfileStore();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    const [originalData, setOriginalData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
    });

    useEffect(() => {
        getUserProfile();
    }, [getUserProfile]);

    useEffect(() => {
        if (profile) {
            const profileData = {
                fullName: profile.fullName || "",
                email: profile.email || "",
                phoneNumber: profile.phoneNumber || "",
                address: profile.address || "",
            };
            setFormData(profileData);
            setOriginalData(profileData);
        }
    }, [profile]);

    const hasChanges = () => {
        return (
            formData.fullName !== originalData.fullName ||
            formData.phoneNumber !== originalData.phoneNumber ||
            formData.address !== originalData.address
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const result = await updateUserProfile(formData.fullName, formData.phoneNumber, formData.address);
        console.log(result);
        if (result.status === "success") {
            toast.success("Saved changes successfully", {
                style: {
                    fontFamily: "Poppins",
                },
            });
        }
    };

    return (
        <>
            <title>Profile | Sweety</title>

            <div className="page-container">
                <NavBar />

                {isLoading ? (
                    <div className="loading-layout">
                        <FontAwesomeIcon className="loading-layout-icon" icon={faSpinner} />
                    </div>
                ) : (
                    <div className={s.profileContainer}>
                        <div className={s.profileModal}>
                            <div className={s.profileTitle}>
                                <h2>My Profile</h2>
                            </div>

                            <form className={s.profileForm} onSubmit={handleSaveChanges}>
                                <div className={s.profileInputRow}>
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={s.profileInputRow}>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" value={formData.email} readOnly />
                                </div>
                                <div className={s.profileInputRow}>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={s.profileInputRow}>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {error && <p className="error-message">{error}</p>}

                                <button type="submit" className={s.profileButton} disabled={!hasChanges() || isLoading}>
                                    {isLoading ? (
                                        <FontAwesomeIcon className="loading" icon={faSpinner} />
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}

export default Profile;
