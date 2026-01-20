import React from 'react'
import BackgroundReservationTrajet from "../../images/reservationtrajet.jpg";
import '../../assets/styles/ReservationTrajet.css';

const ReservationTrajet = () => {
    return (
<div className="relative w-full h-full">
  <img
    src={BackgroundReservationTrajet}
    alt="Background"
    className="absolute right-20 mt-6 w-1/2 object-cover h-auto"
  />
  <div className="absolute left-0 mt-6 ml-8 text-blue text-left flex flex-col items-start">
    <h1 className="text-[95px] font-bold mb-4">
      Need assistance ?
      <br />
      We're here !
    </h1>
  </div>

  <div className="absolute top-80 left-8 mt-40 ml-8 text-black text-left flex flex-col items-start">
    <h2 className="text-[45px] font-bold mb-4">
     Route delivery
    </h2>
  </div>

  <div>
    <div className="absolute top-[200px] left-0 mt-96 ml-10 w-full justify-center">
      <form className="bg-white px-8 pt-6 pb-8 mb-4 w-full">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transportType">
            Select the type of transport required:
          </label>
          <div className="flex space-x-32">
            <label className="inline-flex items-center">
              <input type="radio" name="transportType" value="train" className="form-radio" />
              <span className="ml-2">Train - RER - Subway</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="transportType" value="plane" className="form-radio" />
              <span className="ml-2">Plane</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="transportType" value="tramway" className="form-radio" />
              <span className="ml-2">Tramway</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="transportType" value="bus" className="form-radio" />
              <span className="ml-2">Bus</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="transportType" value="taxi" className="form-radio" />
              <span className="ml-2">Taxi</span>
            </label>
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureStation">
                Departure station
              </label>
              <input
                type="text"
                id="departureStation"
                name="departureStation"
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrivalStation">
                Arrival station
              </label>
              <input
                type="text"
                id="arrivalStation"
                name="arrivalStation"
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="w-1/2 ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountCardNumber">
                Discount Card Number
              </label>
              <input
                type="text"
                id="discountCardNumber"
                name="discountCardNumber"
                className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reserve
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 w-2/5 mb-3 rounded focus:outline-none focus:shadow-outline"
        >
        Continue
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ReservationTrajet;