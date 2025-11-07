import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function AccountDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.success) {
          setUser(response.data.data);
        } else {
          setError('Failed to load user data');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        setError('Could not fetch user data.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <main>
        <section className="profile__area pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12 col-lg-8">
                <h2>Welcome, {user.name}!</h2>
                <p>Email: {user.email}</p>
                <p>Mobile: {user.mobileNo}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AccountDetails;
