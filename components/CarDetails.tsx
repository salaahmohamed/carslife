"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";

import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const getSafeImage = (src?: string) => (src?.trim() ? src : "/placeholder.png");

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Dialog panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                {/* Close button */}
                <button
                  type="button"
                  className="absolute z-10 p-2 rounded-full top-2 right-2 w-fit bg-primary-blue-100"
                  onClick={closeModal}
                >
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

                {/* Main image */}
                <div className="flex flex-col flex-1 gap-3">
                  <div className="relative w-full h-40 bg-center bg-cover rounded-lg bg-pattern">
                    <Image
                      src={getSafeImage(car.image) || generateCarImageUrl(car)}
                      alt={`${car.make} ${car.model}`}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  {/* Thumbnails */}
                  {car.images && car.images.length > 0 ? (
                    <div className="flex gap-3 overflow-x-auto">
                      {car.images.map((url, index) => (
                        <div
                          key={index}
                          className="relative w-full min-w-[6rem] h-24 bg-primary-blue-100 rounded-lg"
                        >
                          <Image
                            src={url}
                            alt={`${car.make} ${car.model} view ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      {["29", "33", "13"].map((angle) => (
                        <div
                          key={angle}
                          className="relative flex-1 w-full h-24 rounded-lg bg-primary-blue-100"
                        >
                          <Image
                            src={generateCarImageUrl(car, angle)}
                            alt={`View angle ${angle}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 gap-2">
                  <h2 className="text-xl font-semibold capitalize">
                    {car.make} {car.model}
                  </h2>

                  <div className="flex flex-wrap gap-4 mt-3">
                    {Object.entries(car).map(([key, value]) => {
                      if (key === "image") return null; // hide image URL
                      if (key === "images") return null; // hide images URL
                      return (
                        <div
                          key={key}
                          className="flex justify-between w-full gap-5 text-right"
                        >
                          <h4 className="capitalize text-grey">
                            {key.replace(/_/g, " ")}
                          </h4>
                          <p className="font-semibold text-black-100">
                            {value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetails;
