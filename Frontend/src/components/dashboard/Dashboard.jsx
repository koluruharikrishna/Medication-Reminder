import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const first_name = useSelector(state => state.first_name);
  const last_name = useSelector(state => state.last_name);
  const [medicineName, setMedicineName] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());


  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
    dispatch({ type: "ISlOGGEDOUT" });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addReminder = () => {
    if (!medicineName || !reminderDate || !reminderTime) {
      alert('Please provide all the reminder details.');
      return;
    }

    const newReminder = {
      medicineName,
      reminderDate,
      reminderTime
    };

    setReminders([...reminders, newReminder]);
    setMedicineName('');
    setReminderDate('');
    setReminderTime('');

    // Calculate the time difference between the reminder time and the current time
    const currentTime = new Date();
    const [hours, minutes] = reminderTime.split(':');
    const reminderDateTime = new Date(reminderDate);
    reminderDateTime.setHours(hours, minutes, 0, 0);
    const timeDifference = reminderDateTime.getTime() - currentTime.getTime();

    // Set up the alert timer if the reminder time is in the future
    if (timeDifference > 0) {
      setTimeout(() => {
        alert(`Time to take your ${medicineName}!`);
      }, timeDifference);
    }
  };

  const deleteReminder = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  return (
    <div>
      <section className='py-5 dashboardBg'>
        <div className='container'>
          <div className='row '>
            <div className='col-xs-12 col-sm-12 col-md-5 col-lg-6'>
              <div className='my-2 py-5'>
                <div className='text-white fs-2 secondary-heading fw-bold'>Welcome</div>
                <h2 className='text-white'>{first_name} {last_name}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-5'>
        <div className='container'>
          <div className='row justify-content-start align-items-center'>
            <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
              <div className='py-2'>
                <div className="reminder-app py-5">
                  <h4>We care for your Time and Health<br></br> <span className='text-secondary fs-5'> We Sechdule all your Medicines on your day to day timings</span> </h4>

                  <div>
                    <div>
                      <p> </p>
                      <h5 className='text-dark'>Current Time:<span className='fs-4 px-2 text-white bg-primary px-4 py-1 rounded-pill'>{currentTime.toLocaleTimeString()}</span></h5>
                    </div>
                    <label className='text-dark' htmlFor="medicineName">Medicine Name:</label>
                    <input
                      type="text"
                      id="medicineName"
                      className='form-control rounded-0  shadow-sm mb-3 mt-2'
                      placeholder='Medicine Name'
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='text-dark' htmlFor="reminderDate">Reminder Date:</label>
                    <input
                      type="date"
                      id="reminderDate"
                      className='form-control mb-3 shadow-sm mt-2'
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='text-dark' htmlFor="reminderTime">Reminder Time:</label>
                    <input
                      type="time"
                      className='form-control mb-3 mt-2 shadow-sm'
                      id="reminderTime"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                    />
                  </div>
                  <button className='btn btn-primary px-4 py-2 my-4 rounded-0 border-0' onClick={addReminder}>Add Reminder</button>

                  <div className="reminder-list">
                    
                  </div>


                </div>
              </div>
            </div>
            {/* end of the first col*/}
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
              <div className='my-2'>
                <img src='https://www.vegathemes.net/medikit/images/desktop-frame-about-2.png' className='img-fluid' />
              </div>
            </div>
            {/* end of the image col */}
            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
            <h5 className='text-dark mb-3 '>Your Sechdule Reminders will Appear Here:</h5>
                    <p className='m-0' style={{listStyleType:'none'}}>
                      {reminders.map((reminder, index) => (
                       <div className='bg-ppl rounded-pill p-2'>
                         <p className='text-dark fs-5 d-flex m-0 justify-content-around  ' key={index}>
                           <div className='d-flex align-items-center mx-3'>
                         <span class="material-symbols-outlined  text-primary">
                            medical_services
                          </span>
                          <span className='mx-2'>  {reminder.medicineName}</span>
                         </div>
                          <div className='d-flex align-items-center mx-3'>
                         <span class="material-symbols-outlined  text-primary">
                            calendar_month
                          </span>
                          <span className='mx-2'> {reminder.reminderDate}</span>
                         </div>

                         <div className='d-flex align-items-center mx-3'>
                         <span class="material-symbols-outlined  text-primary">
                            schedule
                          </span>
                          <span className='mx-2'> {reminder.reminderTime}</span>
                         </div>
                          <button className='btn btn-danger px-4 py-2 rounded-0 mx-3 border-0' onClick={() => deleteReminder(index)}>Delete</button>
                        </p>
                       </div>
                      ))}
                    </p>
            </div>
          </div>
        </div>
      </section>




    </div>

  );
}

export default Dashboard;
