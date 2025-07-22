
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 


const AddPackageAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [tourPlanFields, setTourPlanFields] = useState([{ day: 'Day 1', title: '', description: '' }]);
  const [selectedImages, setSelectedImages] = useState([]); 

  const addTourPlanDay = () => {
    setTourPlanFields([...tourPlanFields, { day: `Day ${tourPlanFields.length + 1}`, title: '', description: '' }]);
  };

  const removeTourPlanDay = (index) => {
    const newFields = [...tourPlanFields];
    newFields.splice(index, 1);
    setTourPlanFields(newFields);
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl && !selectedImages.includes(imageUrl)) {
      setSelectedImages([...selectedImages, imageUrl]);
    } else if (selectedImages.includes(imageUrl)) {
      toast.error("Image URL already added!");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading('Adding package...');

    try {
      // Fix: use data.tourPlan directly, it's already structured correctly
      const formattedTourPlan = data.tourPlan.map((item, index) => ({
        day: `Day ${index + 1}`,
        title: item.title,
        description: item.description
      }));

      let tourGuideIdsArray = [];
      if (data.tourGuideIds) {
        tourGuideIdsArray = data.tourGuideIds.split(',').map(id => id.trim()).filter(id => id.length > 0);
      }

      if (tourGuideIdsArray.length === 0) {
        toast.error('At least one Tour Guide ID is required.', { id: toastId });
        return;
      }

      const newPackage = {
        tripTitle: data.tripTitle,
        tourType: data.tourType,
        price: parseInt(data.price),
        description: data.description,
        image: data.cardImage,
        images: selectedImages,
        tourPlan: formattedTourPlan,
        tourGuides: tourGuideIdsArray,
      };

      const res = await axiosSecure.post('/packages', newPackage);

      if (res.data.insertedId) {
        toast.success('Tour package added successfully!', { id: toastId });
        reset();
        setTourPlanFields([{ day: 'Day 1', title: '', description: '' }]);
        setSelectedImages([]);
      } else {
        toast.error('Failed to add tour package.', { id: toastId });
      }

    } catch (error) {
      console.error("Error submitting package:", error);
      toast.error(`Failed to add tour package: ${error.response?.data?.message || error.message}`, { id: toastId });
    }
  };


  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#FF9494] mb-6 text-center">Admin: Add New Tour Package</h1>
      <p className="text-center text-gray-600 mb-8">Fill out the form below to add a new tour package.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label htmlFor="tripTitle" className="block text-sm font-medium text-gray-700">Trip Title</label>
          <input
            type="text"
            id="tripTitle"
            {...register('tripTitle', { required: 'Trip Title is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.tripTitle && <span className="text-red-500 text-xs">{errors.tripTitle.message}</span>}
        </div>

        {/* Tour Type */}
        <div>
          <label htmlFor="tourType" className="block text-sm font-medium text-gray-700">Tour Type</label>
          <input
            type="text"
            id="tourType"
            {...register('tourType', { required: 'Tour Type is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.tourType && <span className="text-red-500 text-xs">{errors.tourType.message}</span>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            id="price"
            {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price cannot be negative' } })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            rows="4"
            {...register('description', { required: 'Description is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
          {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
        </div>

        {/* Card Image URL */}
        <div>
          <label htmlFor="cardImage" className="block text-sm font-medium text-gray-700">Card Image URL</label>
          <input
            type="url"
            id="cardImage"
            {...register('cardImage', { required: 'Card Image URL is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.cardImage && <span className="text-red-500 text-xs">{errors.cardImage.message}</span>}
        </div>

        {/* Additional Images (for details page) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Detail Images (URLs)</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedImages.map((imgUrl, index) => (
              <div key={index} className="relative inline-block border rounded p-1">
                <img src={imgUrl} alt={`Detail ${index}`} className="h-16 w-16 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddImage}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Detail Image
          </button>
          {selectedImages.length === 0 && <span className="text-red-500 text-xs block mt-1">At least one detail image is recommended.</span>}
        </div>

        {/* Tour Plan */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tour Plan</h3>
          {tourPlanFields.map((field, index) => (
            <div key={index} className="border border-gray-200 p-4 mb-4 rounded-md relative">
              <h4 className="text-md font-medium text-gray-700 mb-2">{field.day}</h4>
              <div className="mb-2">
                <label htmlFor={`tourPlan.${index}.title`} className="block text-sm font-medium text-gray-600">Title for {field.day}</label>
                <input
                  type="text"
                  id={`tourPlan.${index}.title`}
                  {...register(`tourPlan[${index}].title`, { required: `${field.day} Title is required` })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.tourPlan?.[index]?.title && <span className="text-red-500 text-xs">{errors.tourPlan[index].title.message}</span>}
              </div>
              <div>
                <label htmlFor={`tourPlan.${index}.description`} className="block text-sm font-medium text-gray-600">Description for {field.day}</label>
                <textarea
                  id={`tourPlan.${index}.description`}
                  rows="2"
                  {...register(`tourPlan[${index}].description`, { required: `${field.day} Description is required` })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                ></textarea>
                {errors.tourPlan?.[index]?.description && <span className="text-red-500 text-xs">{errors.tourPlan[index].description.message}</span>}
              </div>
              {tourPlanFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTourPlanDay(index)}
                  className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  Remove Day
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTourPlanDay}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Another Day
          </button>
        </div>

        {/* ---- START OF MODIFIED UI FOR TOUR GUIDE IDs ---- */}
        <div>
          <label htmlFor="tourGuideIds" className="block text-sm font-medium text-gray-700">Assign Tour Guide IDs (comma-separated)</label>
          <input
            type="text"
            id="tourGuideIds"
            {...register('tourGuideIds', { required: 'At least one Tour Guide ID is required' })} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g., 654c687645cb2e8b83c6777a3abc, 654c687645cb2e8b83c6777a3abd"
          />
          <p className="text-sm text-gray-500 mt-1">Enter one or more MongoDB `_id`s of tour guides, separated by commas.</p>
          {errors.tourGuideIds && <span className="text-red-500 text-xs">{errors.tourGuideIds.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#FF9494] text-white font-semibold rounded-md hover:bg-[#FF7A7A] focus:outline-none focus:ring-2 focus:ring-[#FF9494] focus:ring-offset-2"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackageAdmin;