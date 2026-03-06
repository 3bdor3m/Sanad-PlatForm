async function run() { 
  const email = 'static_' + Date.now() + '@example.com'; 
  const data = { formType: 'onboarding', fullName: 'Direct', gender: 'male', phone: '22222', personalEmail: email, businessName: 'Exp Biz' }; 
  const res1 = await fetch('http://localhost:5000/api/website-data', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }); 
  console.log('HTTP 1:', res1.status, await res1.json()); 
  const res2 = await fetch('http://localhost:5000/api/website-data', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }); 
  console.log('HTTP 2:', res2.status, await res2.json()); 
} 
run();
