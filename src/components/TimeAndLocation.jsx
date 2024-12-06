import React from 'react'

const TimeAndLocation = ({weather}) => {
    const { formattedLocalTime, name, country } = weather;
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-xl font-extralight'>
                {/* Tuesdays, 14 May 2024 | Local time: 07:21 AM */}
                {formattedLocalTime}
            </p>
        </div>

        <div className='flex items-center justify-center my-3'>
            <p className='text-2xl font-medium'>
                {name} , {country}
            </p>
        </div>
    </div>
  )
}

export default TimeAndLocation