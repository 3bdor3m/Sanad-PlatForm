import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const runTests = async () => {
  try {
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const testPhone = `+1${timestamp.toString().slice(-10)}`;

    console.log('--- Testing Refined Signup ---');
    const signupRes = await axios.post(`${API_URL}/signup`, {
      fullName: 'Abdulkader AlRamadan',
      gender: 'male',
      phoneNumber: testPhone,
      email: testEmail,
      password: 'Password123' // Complexity check: upper, lower, number, min 8
    });
    console.log('Signup Success:', signupRes.data.success);
    const token = signupRes.data.token;

    console.log('\n--- Testing Login ---');
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: testEmail,
      password: 'Password123'
    });
    console.log('Login Success:', loginRes.data.success);

    console.log('\n--- Testing duplicate Phone (Expected 409) ---');
    try {
      await axios.post(`${API_URL}/signup`, {
        fullName: 'Another User',
        gender: 'female',
        phoneNumber: testPhone,
        email: `another${timestamp}@example.com`,
        password: 'Password123'
      });
    } catch (err) {
      console.log('Duplicate Phone Catch:', err.response.status, err.response.data.message);
    }

    console.log('\n--- Testing Invalid Password Complexity (Expected 400) ---');
    try {
      await axios.post(`${API_URL}/signup`, {
        fullName: 'Fail User',
        gender: 'other',
        phoneNumber: `+1000000000`,
        email: `fail${timestamp}@example.com`,
        password: 'password123' // missing uppercase
      });
    } catch (err) {
      console.log('Password Catch:', err.response.status, err.response.data.errors[0].msg);
    }

    console.log('\n--- Testing Protected Me Route ---');
    const meRes = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Me Route Success:', meRes.data.success);
    console.log('User fullName:', meRes.data.data.fullName);

  } catch (error) {
    console.error('Test Failed:', error.response ? error.response.data : error.message);
  }
};

runTests();
