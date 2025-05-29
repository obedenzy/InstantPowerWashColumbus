import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, PhoneCall } from 'lucide-react'; // Removed XCircle
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, isBefore,
  startOfDay, addMonths as dateFnsAddMonths, getHours
} from 'date-fns';
import Calendar from './Calendar';

const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

interface DisplaySlot {
  displayTime: string;
  valueTime: string;
}

interface BookedSlot {
  booking_date: string;
  book_time: string;
}

interface Service {
  id: string;
  title: string;
  unit_label: string;
  unit_name: string;
}

interface SelectedService {
  serviceId: string;
  title: string;
  quantity: number; // Will store 0 for "empty or zero before blur"
  unitLabel: string;
  options?: { [key: string]: any };
}

interface PriceDetail { // This is also the structure of selected_services_details items
  serviceId: string;
  title: string;
  quantity: number;
  unitLabel: string;
  estimatedPrice: number;
  priceRange: string;
}

interface SuccessfulBookingDetails {
  id: string;
  booking_date_est: string;
  book_time_est: string;
  first_name: string;
  email: string;
  phone?: string | null;
  project_address: string;
  project_description?: string | null;
  selected_services_details: PriceDetail[];
  total_min_estimated_price?: number | null;
  total_max_estimated_estimated_price?: number | null;
  created_at: string;
	booking_id:string;
}

const paintColorsData = [
  { name: "Alabaster (SW 7008)", hex: "#F0EDE5" }, { name: "Pure White (SW 7005)", hex: "#F5F6F0" },
  { name: "Agreeable Gray (SW 7029)", hex: "#D1CBC1" }, { name: "Natural Linen (SW 9109)", hex: "#E8DCCA" },
  { name: "Repose Gray (SW 7015)", hex: "#CCC9C0" }, { name: "Dorian Gray (SW 7017)", hex: "#A9A8A1" },
  { name: "Sea Salt (SW 6204)", hex: "#C6D6D1" }, { name: "Rainwashed (SW 6211)", hex: "#B5C8C1" },
  { name: "Aesthetic White (SW 7035)", hex: "#E6E1D6" }, { name: "Tricorn Black (SW 6258)", hex: "#2F2F2F" },
  { name: "Urbane Bronze (SW 7048)", hex: "#54504A" }, { name: "Naval (SW 6244)", hex: "#2E3A59" },
  { name: "Peppercorn (SW 7674)", hex: "#5C5A5A" }, { name: "Accessible Beige (SW 7036)", hex: "#D2C8B7" },
  { name: "Drift of Mist (SW 9166)", hex: "#E3E1D9" }, { name: "Eider White (SW 7014)", hex: "#E6E4E0" },
  { name: "Snowbound (SW 7004)", hex: "#F2F1ED" }, { name: "Mindful Gray (SW 7016)", hex: "#B0A8A0" },
  { name: "Pavestone (SW 7642)", hex: "#A39F96" }, { name: "Oyster White (SW 7637)", hex: "#E8D8D2" },
  { name: "Kilim Beige (SW 6106)", hex: "#D7C8B5" }, { name: "Silver Strand (SW 7057)", hex: "#C1C8C2" },
  { name: "Comfort Gray (SW 6205)", hex: "#A8BDB1" }, { name: "Evergreen Fog (SW 9130)", hex: "#959A88" },
  { name: "Iron Ore (SW 7069)", hex: "#434341" }, { name: "Extra White (SW 7006)", hex: "#F5F5F2" },
  { name: "Classic French Gray (SW 0077)", hex: "#868684" }, { name: "Jasper Stone (SW 9133)", hex: "#A8B1A4" },
  { name: "Mauve Finery (SW 6282)", hex: "#A97A8A" }, { name: "Cascades (SW 7623)", hex: "#3A5C6E" },
  { name: "Charcoal Blue (SW 2739)", hex: "#3F4A56" }, { name: "Caviar (SW 6990)", hex: "#2B2B2B" },
  { name: "Hushed Auburn (SW 6027)", hex: "#A66D5A" }, { name: "Antique White (SW 6119)", hex: "#EDE1CF" },
  { name: "Dovetail (SW 7018)", hex: "#908A83" }, { name: "Gray Screen (SW 7071)", hex: "#C8C9C6" },
  { name: "Morning Fog (SW 6255)", hex: "#A5A7A3" }, { name: "Anew Gray (SW 7030)", hex: "#C5BBAE" },
  { name: "Tinsmith (SW 7657)", hex: "#C6CBCB" }, { name: "Mount Etna (SW 7625)", hex: "#3A4F5A" },
  { name: "Fleur de Sel (SW 7666)", hex: "#D8D8D2" }, { name: "Shoji White (SW 7042)", hex: "#E8E3D6" },
  { name: "Storm Cloud (SW 6249)", hex: "#5F7278" }, { name: "Indigo Batik (SW 7602)", hex: "#3C4A65" },
  { name: "Alpaca (SW 7022)", hex: "#C4BDB5" }, { name: "Passive (SW 7064)", hex: "#C8C8C2" },
  { name: "Kale Green (SW 6460)", hex: "#5A6658" }, { name: "Ryegrass (SW 6443)", hex: "#6B7664" },
  { name: "Blue Peacock (SW 0064)", hex: "#1F3A44" }, { name: "Colonnade Gray (SW 7641)", hex: "#B5B2A8" },
  { name: "Warm Stone (SW 7032)", hex: "#B8AFA2" }, { name: "Crushed Ice (SW 7647)", hex: "#D7D8D5" },
  { name: "Mink (SW 6004)", hex: "#7A6A5F" }, { name: "Sage Green Light (SW 2851)", hex: "#B5C1A8" },
  { name: "Clary Sage (SW 6178)", hex: "#A2A88F" }, { name: "Copen Blue (SW 0068)", hex: "#5C8292" },
  { name: "Hale Navy (SW 2819)", hex: "#2F3D4C" }, { name: "Bittersweet Stem (SW 9068)", hex: "#A2A287" },
  { name: "Oatmeal (SW 6102)", hex: "#E4D5C0" }, { name: "Tidal (SW 6477)", hex: "#B8C7C3" },
  { name: "Pewter Tankard (SW 0023)", hex: "#A5A49F" }, { name: "Slate Tile (SW 7624)", hex: "#5C6566" },
  { name: "Dusty Heather (SW 9071)", hex: "#A68D9A" }, { name: "Creamy (SW 7012)", hex: "#F3E9D8" },
  { name: "Shell White (SW 8917)", hex: "#F1EDE5" }, { name: "Light French Gray (SW 0055)", hex: "#C5C7C4" },
  { name: "Inky Blue (SW 9149)", hex: "#4A5A6F" }, { name: "Porpoise (SW 7047)", hex: "#8A8175" },
  { name: "Coconut Husk (SW 6111)", hex: "#A18D7A" }, { name: "Grecian Ivory (SW 7541)", hex: "#E3D8C7" },
  { name: "Nebulous White (SW 7063)", hex: "#DEDEDC" }, { name: "Blue Horizon (SW 6499)", hex: "#A2B8C0" },
  { name: "Sagebrush (SW 9150)", hex: "#A7A693" }, { name: "Tawny Tan (SW 7547)", hex: "#CBBBA9" },
  { name: "Toile Red (SW 0007)", hex: "#A14C4B" }, { name: "Rustic Red (SW 7593)", hex: "#8D3C3A" },
  { name: "Bosc Pear (SW 6390)", hex: "#C9A567" }, { name: "Blonde (SW 6128)", hex: "#E7D5B9" },
  { name: "Cork Wedge (SW 7538)", hex: "#A68C6D" }, { name: "Fawn Brindle (SW 7640)", hex: "#A39A8F" },
  { name: "Foothills (SW 7514)", hex: "#8C7E6E" }, { name: "Chamois (SW 6049)", hex: "#EBD5B3" },
  { name: "Silvermist (SW 7621)", hex: "#B5C1BF" }, { name: "Thunder Gray (SW 6201)", hex: "#6A7373" },
  { name: "Canal Blue (SW 6796)", hex: "#5E8296" }, { name: "Wheat Grass (SW 6408)", hex: "#A9A885" },
  { name: "Pale Moss (SW 6432)", hex: "#B4B897" }, { name: "Coral Clay (SW 9005)", hex: "#C7876D" },
  { name: "Dried Thyme (SW 6186)", hex: "#8C917A" }, { name: "Hazel (SW 6471)", hex: "#A7B295" },
  { name: "Foxy (SW 6333)", hex: "#A6745B" }, { name: "Spiced Cider (SW 7702)", hex: "#A6725A" },
  { name: "Mesa Tan (SW 7698)", hex: "#CBB59F" }, { name: "Twilight Blue (SW 9152)", hex: "#5B6E82" },
  { name: "Velvet Mauve (SW 6264)", hex: "#A47C8A" }, { name: "Sandbar (SW 7547)", hex: "#CBBBA9" },
  { name: "Mocha (SW 6065)", hex: "#A3846E" }, { name: "Urban Jungle (SW 9140)", hex: "#A7A693" },
  { name: "Tidewater (SW 6475)", hex: "#A1B8B7" }, { name: "Mossy Oak (SW 6457)", hex: "#929781" },
];


const formatTo12Hour = (time24: string): string => {
  try {
    const [hours, minutes] = time24.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return format(date, 'h:mm a');
  } catch (e) {
    console.error("Error formatting time:", time24, e);
    return time24;
  }
};

const generatePotentialDisplaySlotsEST = (dateString: string): DisplaySlot[] => {
  const slots: DisplaySlot[] = [];
  const startHourEST = 8;
  const endHourEST = 19;

  for (let hour = startHourEST; hour <= endHourEST; hour++) {
    const valueTime = `${String(hour).padStart(2, '0')}:00`;
    slots.push({
      displayTime: formatTo12Hour(valueTime),
      valueTime: valueTime,
    });
  }
  return slots;
};

const FreeQuote: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeValue, setSelectedTimeValue] = useState('');
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [bookedESTSlots, setBookedESTSlots] = useState<Set<string>>(new Set());
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableDisplayTimes, setAvailableDisplayTimes] = useState<DisplaySlot[]>([]);
  const [fetchedRange, setFetchedRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  const [calculatedPriceDetails, setCalculatedPriceDetails] = useState<PriceDetail[]>([]);
  const [totalMinEstimate, setTotalMinEstimate] = useState<number>(0);
  const [totalMaxEstimate, setTotalMaxEstimate] = useState<number>(0);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [priceCalculationError, setPriceCalculationError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'success' | 'error' | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [lastSuccessfulBookingDetails, setLastSuccessfulBookingDetails] = useState<SuccessfulBookingDetails | null>(null);
  const isFetchingRef = useRef(false);
  const calculationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Removed paintBought and selectedPaintColor states
  // const [paintBought, setPaintBought] = useState<string>('');
  // const [selectedPaintColor, setSelectedPaintColor] = useState<string>('');

  // Removed projectImages and imagePreviews states
  // const [projectImages, setProjectImages] = useState<File[]>([]);
  // const [imagePreviews, setImagePreviews] = useState<string[]>([]); // State for image previews
  // Removed imageError state
  // const [imageError, setImageError = useState<string | null>(null);


  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      setServiceError(null);
      try {
        const url = `${BACKEND_BASE_URL}/api/services`;
        console.log('Fetching services from:', url); // Log the URL
        const response = await fetch(url, {
          method: 'GET', // This is a GET request for services
          credentials: "include", // Include cookies for authentication
        });
        if (!response.ok) throw new Error(`Failed to fetch services (status ${response.status})`);
        const data = await response.json();
        if (!data.success || !Array.isArray(data.services)) throw new Error('Invalid service data.');
        setAvailableServices(data.services);
      } catch (error: any) {
        console.error("Failed to fetch services:", error);
        setServiceError(`Error loading services: ${error.message}`);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const fetchBookedSlotsForRange = useCallback(async (startDate: Date, endDate: Date) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoadingAvailability(true);
    setAvailabilityError(null);
    const startStr = format(startDate, 'yyyy-MM-dd');
    const endStr = format(endDate, 'yyyy-MM-dd');

    try {
      const url = `${BACKEND_BASE_URL}/api/availability?startDate=${startStr}&endDate=${endStr}`;
      console.log('Fetching availability from:', url); // Log the URL
      const response = await fetch(url, {
        method: 'GET', // This is a GET request for availability
        credentials: "include", // Include cookies for authentication
      });
      if (!response.ok) throw new Error(`Failed to fetch availability (status ${response.status})`);
      const data = await response.json();
      if (!data.success || !Array.isArray(data.bookedSlots)) throw new Error('Invalid availability data.');

      setBookedESTSlots(prevSet => {
        const newSet = new Set(prevSet);
        data.bookedSlots.forEach((slot: BookedSlot) => newSet.add(`${slot.booking_date}-${slot.book_time}`));
        return newSet;
      });
      setFetchedRange({ start: startDate, end: endDate });
    } catch (err: any) {
      console.error('Error fetching booked EST slots:', err);
      setAvailabilityError(`Failed to load availability: ${err.message}`);
    } finally {
      setLoadingAvailability(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const today = startOfDay(new Date());
    const endDate = dateFnsAddMonths(today, 3);
    fetchBookedSlotsForRange(today, endDate);
  }, [fetchBookedSlotsForRange]);

  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start, end });
    const today = startOfDay(new Date());
    const calculatedAvailableDates = daysInMonth
      .filter(day => !isBefore(day, today))
      .filter(day => {
        const dateString = format(day, 'yyyy-MM-dd');
        const potentialSlots = generatePotentialDisplaySlotsEST(dateString);
        return potentialSlots.some(slot => !bookedESTSlots.has(`${dateString}-${slot.valueTime}`));
      })
      .map(day => format(day, 'yyyy-MM-dd'));
    setAvailableDates(calculatedAvailableDates.sort());
  }, [bookedESTSlots, currentMonth]);

  useEffect(() => {
    if (selectedDate) {
      const potentialSlots = generatePotentialDisplaySlotsEST(selectedDate);
      const now = new Date();
      const currentHour = getHours(now);
      const available = potentialSlots.filter(slot => {
        const slotHour = parseInt(slot.valueTime.split(':')[0], 10);
        const isFuture = format(parseISO(selectedDate), 'yyyy-MM-dd') !== format(now, 'yyyy-MM-dd') || slotHour > currentHour;
        return isFuture && !bookedESTSlots.has(`${selectedDate}-${slot.valueTime}`);
      });
      setAvailableDisplayTimes(available);
    } else {
      setAvailableDisplayTimes([]);
    }
    setSelectedTimeValue('');
  }, [selectedDate, bookedESTSlots]);

  const calculatePrice = useCallback(async () => {
    if (selectedServices.length === 0 || selectedServices.some(s => !s.quantity || s.quantity <= 0)) {
      setCalculatedPriceDetails([]);
      setTotalMinEstimate(0);
      setTotalMaxEstimate(0);
      setPriceCalculationError(null);
      return;
    }
    setIsCalculatingPrice(true);
    setPriceCalculationError(null);
    const payload = {
 selectedServices: JSON.stringify(selectedServices.map(s => ({
      serviceId: s.serviceId,
 quantity: s.quantity,
 options: s.options || {}
 })))
    };
    try {
      const url = new URL(`${BACKEND_BASE_URL}/api/calculate-price`);
 url.search = new URLSearchParams(payload).toString();
      console.log('Calculating price from:', url.toString()); // Log the URL
      const response = await fetch(url.toString(), {
 method: 'GET', // This is a GET request for calculation
 credentials: "include", // Include cookies for authentication
      });
      const result = await response.json(); // This is a GET request for calculation
      setCalculatedPriceDetails(result.priceDetails || []);
      setTotalMinEstimate(result.totalMinEstimate || 0);
      setTotalMaxEstimate(result.totalMaxEstimate || 0);
    } catch (error: any) {
      console.error("Price calculation error:", error);
      setPriceCalculationError(`Error calculating price: ${error.message}`);
      setCalculatedPriceDetails([]);
      setTotalMinEstimate(0);
      setTotalMaxEstimate(0);
    } finally {
      setIsCalculatingPrice(false);
    }
  }, [selectedServices]);

  useEffect(() => {
    if (calculationTimeoutRef.current) clearTimeout(calculationTimeoutRef.current);
    calculationTimeoutRef.current = setTimeout(() => calculatePrice(), 500);
    return () => { if (calculationTimeoutRef.current) clearTimeout(calculationTimeoutRef.current); };
  }, [selectedServices, calculatePrice]);

  const handleServiceSelectionChange = (serviceId: string, isChecked: boolean) => {
    const service = availableServices.find(s => s.id === serviceId);
    if (!service) return;
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(service.id)) return;
    setSelectedServices(prev => {
      let newState;
      if (isChecked) {
        if (!prev.some(s => s.serviceId === service.id)) {
          newState = [...prev, { serviceId: service.id, title: service.title, quantity: 1, unitLabel: service.unit_label }];
        } else {
          newState = prev;
        }
      } else {
        newState = prev.filter(s => s.serviceId !== service.id); // Corrected filter condition
      }
      return newState;
    });
  };

  const handleQuantityChange = (serviceId: string, value: string) => {
    let newQuantity: number;
    if (value === '') {
      newQuantity = 0; // Represent empty as 0 internally for now
    } else {
      const numVal = parseInt(value, 10);
      newQuantity = isNaN(numVal) ? 0 : Math.max(0, numVal); // Allow 0, prevent negative
    }
    setSelectedServices(prev =>
      prev.map(s =>
        s.serviceId === serviceId ? { ...s, quantity: newQuantity } : s
      )
    );
  };

  const handleQuantityBlur = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.map(s =>
        s.serviceId === serviceId && s.quantity <= 0 ? { ...s, quantity: 1 } : s
      )
    );
  };

  // Removed handleImageChange function
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files);
  //     setImageError(null); // Clear previous error on new selection

  //     // Append new files to the existing list
  //     setProjectImages(prevImages => [...prevImages, ...filesArray]);

  //     // Generate previews for the new files and append to existing previews
  //     filesArray.forEach(file => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         if (typeof reader.result === 'string') {
  //           setImagePreviews(prevPreviews => [...prevPreviews, reader.result as string]);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     });

  //     // Clear the file input value so the same file can be selected again if needed
  //     e.target.value = '';
  //   }
  // };

  // Removed handleRemoveImage function
  // const handleRemoveImage = (indexToRemove: number) => {
  //   setProjectImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  //   setImagePreviews(prevPreviews => imagePreviews.filter((_, index) => index !== indexToRemove));
  //   // No need to clear file input value here as we are only removing from state
  // };


  const handleDateSelection = (date: string) => {
    if (availableDates.includes(date)) setSelectedDate(date);
    else setSelectedDate(null);
    setSelectedTimeValue('');
  };

  const handleMonthChange = (newMonth: Date) => {
    const today = startOfDay(new Date());
    const maxNavDate = dateFnsAddMonths(today, 3);
    if (isBefore(newMonth, startOfMonth(today)) || isBefore(maxNavDate, newMonth)) return;
    setCurrentMonth(startOfMonth(newMonth));
    setSelectedDate(null);
    const currentFetchEnd = fetchedRange.end;
    if (!currentFetchEnd || isBefore(currentFetchEnd, dateFnsAddMonths(newMonth, 1))) {
       const fetchStartDate = currentFetchEnd ? dateFnsAddMonths(newMonth, 0) : today;
       const fetchEndDate = dateFnsAddMonths(newMonth, 3);
       fetchBookedSlotsForRange(fetchStartDate, fetchEndDate);
    }
  };

  const handleTimeSelection = (timeValue: string) => setSelectedTimeValue(timeValue);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    // Removed setImageError(null);
    setLastSuccessfulBookingDetails(null);
    let hasErrors = false;
    const newErrors: { [key: string]: string } = {};

    if (selectedServices.length === 0 || selectedServices.some(s => !s.quantity || s.quantity <= 0)) {
      newErrors.services = 'Please select at least one service and enter a valid quantity.'; hasErrors = true;
    }
    if (!selectedDate) { newErrors.date = 'Please select a date.'; hasErrors = true; }
    if (!selectedTimeValue) { newErrors.time = 'Please select a time.'; hasErrors = true; }
    if (!fullName) { newErrors.fullName = 'Please enter your full name.'; hasErrors = true; }
    if (!email) { newErrors.email = 'Please enter your email.'; hasErrors = true; }
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) { newErrors.email = 'Invalid email format.'; hasErrors = true; }
    }
    if (!phone) { newErrors.phone = 'Please enter your phone number.'; hasErrors = true; }
    else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) { newErrors.phone = 'Phone number must be 10 digits.'; hasErrors = true; }
    }
    if (!projectAddress) { newErrors.projectAddress = 'Please enter your project address.'; hasErrors = true; }
    // Removed mandatory image validation: if (projectImages.length === 0) { newErrors.images = 'Please upload at least one image of the project area.'; hasErrors = true; }


    if (hasErrors) { setFormErrors(newErrors); return; }

    setBookingStatus(null); setBookingError(null);
    setLoadingBooking(true);

    // Removed image conversion and handling logic
    // let imagesBase64: { filename: string, base64: string, mimeType: string }[] = [];
    // if (projectImages.length > 0) {
    //   try {
    //     imagesBase64 = await convertImagesToBase64(projectImages);
    //   } catch (imgErr: any) {
    //     console.error("Error converting images to base64:", imgErr);
    //     setImageError("Failed to process images. Please try again.");
    //     setLoadingBooking(false);
    //     return;
    //   }
    // }
    // let imagesBase64: { filename: string, base64: string, mimeType: string }[] = [];


    const bookingPayload = {
      selectedDate, selectedTimeValue,
      firstName: fullName,
      email, phone, projectAddress,
      projectDescription: projectDescription || '', // Ensure empty string if null/undefined
      selectedServices: JSON.stringify(calculatedPriceDetails), // Stringify for query param
      totalMinEstimate,
      totalMaxEstimate,
      // Removed paint_bought and paint_color from payload
      // paint_bought: paintBought === 'yes' ? true : (paintBought === 'no' ? false : null),
      // paint_color: paintBought === 'yes' ? (selectedPaintColor || null) : null,
      // Removed images from payload
      // images: JSON.stringify(imagesBase64), // Stringify for query param (will be "[]")
    };

    try {
      const url = new URL(`${BACKEND_BASE_URL}/api/book`);
      url.search = new URLSearchParams(bookingPayload as any).toString(); // Use URLSearchParams for GET
      console.log('Submitting booking to:', url.toString()); // Log the URL
      const response = await fetch(url.toString(), {
        method: 'GET', // Changed to GET
        credentials: "include",
        // body: JSON.stringify(bookingPayload) // Removed body for GET
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setBookingStatus('error');
        setBookingError(result.message || `Booking failed`);
      } else {
        setBookingStatus('success');
        setLastSuccessfulBookingDetails(result.bookingDetails);
        setFullName(''); setEmail(''); setPhone(''); setProjectAddress('');
        setSelectedServices([]); setCalculatedPriceDetails([]);
        setTotalMinEstimate(0); setTotalMaxEstimate(0);
        setSelectedDate(null); setSelectedTimeValue(''); setProjectDescription('');
        // Removed clearing paintBought and selectedPaintColor
        // setPaintBought(''); setSelectedPaintColor('');
        // Removed clearing projectImages and imagePreviews
        // setProjectImages([]); // Clear images
        // setImagePreviews([]); // Clear previews
        // const fileInput = document.getElementById('projectImages') as HTMLInputElement;
        // if (fileInput) {
        //   fileInput.value = ''; // Clear file input value
        // }
        setBookedESTSlots(prev => new Set(prev).add(`${selectedDate}-${selectedTimeValue}`));
      }
    } catch (err: any) {
      console.error('Error submitting booking:', err);
      setBookingStatus('error');
      setBookingError(`Booking failed: ${err.message}`);
    } finally {
      setLoadingBooking(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-brand-navy-blue">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <div className="md:w-2/5 text-brand-white p-8 flex flex-col justify-center">
            <span className="text-brand-orange text-sm font-semibold mb-2">CONTACT US</span>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Interested In Power Washing Service? Book With us Today! Instant Response
            </h2>
            <div className="mt-4">
              <div className="bg-brand-slate-gray p-4 rounded-lg flex items-center space-x-3">
                <PhoneCall size={32} className="text-brand-orange" />
                <div>
                  <p className="text-sm">Call Us Now</p>
                  <p className="text-xl font-bold">+1 (614) 655-1216</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/5 bg-brand-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-brand-navy-blue mb-6 text-left">Book Your Instant Power Washing Service</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="Full Name" required className={`w-full p-3 border ${formErrors.fullName ? 'border-red-500' : 'border-brand-slate-gray'} rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange`} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
              </div>

              <div>
                <input type="email" placeholder="Email Address" required className={`w-full p-3 border ${formErrors.email ? 'border-red-500' : 'border-brand-slate-gray'} rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange`} value={email} onChange={handleEmailChange} />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <input type="tel" placeholder="Phone (##########)" required className={`w-full p-3 border ${formErrors.phone ? 'border-red-500' : 'border-brand-slate-gray'} rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange`} value={phone} onChange={handlePhoneChange} maxLength={10} />
                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <input type="text" placeholder="Project Address" required className={`w-full p-3 border ${formErrors.projectAddress ? 'border-red-500' : 'border-brand-slate-gray'} rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange`} value={projectAddress} onChange={(e) => setProjectAddress(e.target.value)} />
                {formErrors.projectAddress && <p className="text-red-500 text-sm mt-1">{formErrors.projectAddress}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy-blue mb-2">Select Service(s) *</label>
                {loadingServices ? (
                  <p className="text-sm text-brand-slate-gray">Loading services...</p>
                ) : serviceError ? (
                  <p className="text-sm text-red-500">{serviceError}</p>
                ) : availableServices.length > 0 ? (
                  <div className="space-y-2 p-2 border rounded-md">
                    {availableServices.map((service) => (
                      <div key={service.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`service-${service.id}`}
                          checked={selectedServices.some(s => s.serviceId === service.id)}
                          onChange={(e) => handleServiceSelectionChange(service.id, e.target.checked)}
                          className="h-4 w-4 text-brand-orange border-brand-slate-gray rounded focus:ring-brand-orange"
                        />
                        <label htmlFor={`service-${service.id}`} className="ml-2 block text-sm text-brand-navy-blue">
                          {service.title}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-brand-slate-gray">No services available.</p>
                )}
                {formErrors.services && <p className="text-red-500 text-sm mt-1">{formErrors.services}</p>}
              </div>

              {selectedServices.length > 0 && (
                <div className="space-y-3 pt-2">
                  <label className="block text-sm font-medium text-brand-navy-blue mb-1">Quantity *</label>
                  {selectedServices.map((selected) => (
                    <div key={selected.serviceId} className="flex items-center space-x-2"> {/* Added flex and space-x */}
                      <label htmlFor={`quantity-${selected.serviceId}`} className="block text-xs font-medium text-brand-slate-gray mb-1 flex-grow"> {/* Added flex-grow */}
                        {selected.title} ({selected.unitLabel || 'units'})
                      </label>
                      <input
                        type="number"
                        id={`quantity-${selected.serviceId}`}
                        min="0"
                        required
                        value={selected.quantity === 0 ? '' : selected.quantity} // Show empty if 0
                        onChange={(e) => handleQuantityChange(selected.serviceId, e.target.value)}
                        onBlur={() => handleQuantityBlur(selected.serviceId)}
                        className="w-20 p-2 border border-brand-slate-gray rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange text-right" // Adjusted width and text alignment
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Removed "Have you bought the paint? (Optional)" section */}
              {/*
              <div>
                <label className="block text-sm font-medium text-brand-navy-blue mb-2">Have you bought the paint? (Optional)</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="paintBought" value="yes" checked={paintBought === 'yes'} onChange={(e) => setPaintBought(e.target.value)} className="h-4 w-4 text-brand-orange border-brand-slate-gray focus:ring-brand-orange"/>
                    <span className="ml-2 text-sm text-brand-navy-blue">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="paintBought" value="no" checked={paintBought === 'no'} onChange={(e) => setPaintBought(e.target.value)} className="h-4 w-4 text-brand-orange border-brand-slate-gray focus:ring-brand-orange"/>
                    <span className="ml-2 text-sm text-brand-navy-blue">No</span>
                  </label>
                </div>
              </div>
              */}

              {/* Removed "Paint Color (Optional)" section */}
              {/*
              <div>
                <label htmlFor="paintColor" className="block text-sm font-medium text-brand-navy-blue mb-2">Paint Color (Optional)</label>
                <select
                  id="paintColor"
                  value={selectedPaintColor}
                  onChange={(e) => setSelectedPaintColor(e.target.value)}
                  className="w-full p-3 border border-brand-slate-gray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-white"
                >
                  <option value="">Select a color...</option>
                  {paintColorsData.map(color => (
                    <option key={color.name} value={color.name} style={{ backgroundColor: color.hex, color: getContrastYIQ(color.hex) }}>
                      {color.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-brand-slate-gray mt-1">The color list is based on Sherwin-Williams 100 common paint colors.</p>
              </div>
              */}

              {/* Removed "Upload Project Images (Optional)" section */}
              {/*
              <div>
                <label htmlFor="projectImages" className="block text-sm font-medium text-brand-navy-blue mb-2">Upload Project Images (Optional)</label>
                <input
                  type="file"
                  id="projectImages"
                  multiple
                  accept="image/*"
                  className={`w-full p-3 border ${formErrors.images ? 'border-red-500' : 'border-brand-slate-gray'} rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-brand-orange hover:file:bg-orange-100`}
                  onChange={handleImageChange}
                />
                 {projectImages.length > 0 && (
                    <div className="mt-2 text-sm text-brand-navy-blue">
                      <p className="font-medium">Selected files:</p>
                      <ul className="list-disc list-inside ml-4">
                        {projectImages.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                 )}
                {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}

                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {imagePreviews.map((previewUrl, index) => (
                      <div key={index} className="relative w-full aspect-square rounded-md overflow-hidden border border-brand-slate-gray">
                        <img src={previewUrl} alt={`Project preview ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-brand-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              */}

              <div>
                <label className="block text-sm font-medium text-brand-navy-blue mb-1">Select Date *</label>
                {loadingAvailability && !fetchedRange.start ? (
                  <div className="p-4 border rounded-md text-center text-brand-slate-gray">Loading dates...</div>
                ) : availabilityError ? (
                  <p className="text-red-500">{availabilityError}</p>
                ) : (
                  <Calendar
                    availableDates={availableDates}
                    onDateSelect={handleDateSelection}
                    selectedDate={selectedDate}
                    currentMonth={currentMonth}
                    onMonthChange={handleMonthChange}
                    maxDate={dateFnsAddMonths(startOfDay(new Date()), 3)}
                  />
                )}
                {formErrors.date && <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>}
                {!selectedDate && !loadingAvailability && availableDates.length > 0 && <p className="text-xs text-brand-slate-gray mt-1">Select an available date.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-navy-blue mb-2">Select Time *</label>
                {selectedDate ? (
                  availableDisplayTimes.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {availableDisplayTimes.map((slot) => (
                        <button
                            key={slot.valueTime}
                            type="button"
                            onClick={() => handleTimeSelection(slot.valueTime)} // Corrected to slot.valueTime
                            className={`p-2 border rounded-md text-sm transition-colors duration-150 ease-in-out w-full ${selectedTimeValue === slot.valueTime
                              ? 'bg-brand-orange text-brand-white border-brand-orange font-semibold'
                              : 'bg-brand-white text-brand-orange border-brand-slate-gray hover:bg-orange-100'
                              }`}
                          >
                            {slot.displayTime}
                          </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-slate-gray">No available times for this date.</p>
                  )
                ) : (
                  <p className="text-sm text-brand-slate-gray">Please select a date first.</p>
                )}
                {formErrors.time && <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>}
              </div>

              <div>
                <textarea placeholder="Message (Project Description)" rows={3} className="w-full p-3 border border-brand-slate-gray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></textarea>
              </div>

              { (selectedServices.length > 0 && calculatedPriceDetails.length > 0) && (
                <div className="my-6 p-4 border border-brand-slate-gray rounded-md bg-brand-white space-y-2">
                  <h3 className="text-lg font-semibold text-brand-navy-blue">Estimated Price</h3>
                  {isCalculatingPrice && <p className="text-sm text-brand-slate-gray">Calculating...</p>}
                  {priceCalculationError && <p className="text-sm text-red-500">{priceCalculationError}</p>}
                  {!isCalculatingPrice && calculatedPriceDetails.length > 0 && (
                    <>
                      {calculatedPriceDetails.map(detail => (
                        <div key={detail.serviceId} className="flex justify-between text-sm">
                          <span>
                            {detail.title}
                            {detail.quantity > 1 && ` (Quantity: ${detail.quantity})`} {/* Only show quantity if > 1 */}
                            {detail.quantity === 1 && detail.unitLabel ? ` (${detail.unitLabel})` : ''} {/* Show unitLabel in parentheses if quantity is 1 */}
                          </span>
                          <span className="font-medium">{detail.priceRange}</span>
                        </div>
                      ))}
                      <hr className="my-2 border-brand-slate-gray"/>
                      <div className="flex justify-between font-bold text-brand-navy-blue">
                        <span>Total Estimated Price Range:</span>
                        <span>
                          ${totalMinEstimate.toFixed(2)} - ${totalMaxEstimate.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                  {!isCalculatingPrice && calculatedPriceDetails.length === 0 && selectedServices.length > 0 && !priceCalculationError && (
                    <p className="text-sm text-brand-slate-gray">Enter quantity for selected service(s) to see estimate.</p>
                  )}
                </div>
              )}
               {!isCalculatingPrice && selectedServices.length === 0 && (
                 <p className="text-sm text-brand-slate-gray mt-2">Select a service and quantity to see price estimate.</p>
              )}


              <button
                type="submit"
                className="bg-brand-orange hover:bg-opacity-90 text-brand-white font-bold py-3 px-8 rounded-md text-lg flex items-center justify-center space-x-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                // Updated disabled condition to remove projectImages check
                disabled={loadingBooking || isCalculatingPrice || !fullName || !email || !phone || !projectAddress || selectedServices.length === 0 || selectedServices.some(s => !s.quantity || s.quantity <= 0) || !selectedDate || !selectedTimeValue}
              >
                {loadingBooking ? 'Booking...' : 'Submit Now'}
                {!loadingBooking && <ChevronRight size={20} />}
              </button>
            </form>

            {bookingStatus === 'success' && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-semibold">Booking successful! We'll be in touch.</p>
                {lastSuccessfulBookingDetails && (
                  <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded-md text-left text-brand-slate-gray">
                    <h4 className="text-md font-semibold text-green-700 mb-3">Your Booking Confirmation:</h4>
                    <p><strong>Booking ID:</strong> <span className="text-xs">{lastSuccessfulBookingDetails.booking_id}</span></p>
                    <p><strong>Name:</strong> {lastSuccessfulBookingDetails.first_name}</p>
                    <p><strong>Email:</strong> {lastSuccessfulBookingDetails.email}</p>
                    {lastSuccessfulBookingDetails.phone && <p><strong>Phone:</strong> {lastSuccessfulBookingDetails.phone}</p>}
                    <p><strong>Address:</strong> {lastSuccessfulBookingDetails.project_address}</p>
                    <p><strong>Date:</strong> {format(parseISO(lastSuccessfulBookingDetails.booking_date_est), 'MMMM d, yyyy')}</p>
                    <p><strong>Time:</strong> {formatTo12Hour(lastSuccessfulBookingDetails.book_time_est)}</p>

                    {lastSuccessfulBookingDetails.selected_services_details && lastSuccessfulBookingDetails.selected_services_details.length > 0 && (
                      <div className="mt-2">
                        <strong className="block mb-1">Services Booked:</strong>
                        <ul className="list-disc list-inside pl-4">
                          {lastSuccessfulBookingDetails.selected_services_details.map((service, index) => (
                            <li key={index}>
                              {service.title}
                              {service.quantity > 1 && ` (Quantity: ${service.quantity})`}
                              {service.quantity === 1 && service.unitLabel ? ` (${service.unitLabel})` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Removed paint_bought and paint_color display */}
                    {/*
                    {lastSuccessfulBookingDetails.paint_bought !== null && typeof lastSuccessfulBookingDetails.paint_bought !== 'undefined' && (
                      <p className="mt-2"><strong>Paint Bought by You:</strong> {lastSuccessfulBookingDetails.paint_bought ? 'Yes' : 'No'}</p>
                    )}
                    {lastSuccessfulBookingDetails.paint_bought && lastSuccessfulBookingDetails.paint_color && (
                      <p><strong>Selected Paint Color:</strong> {lastSuccessfulBookingDetails.paint_color}</p>
                    )}
                    */}
                    {lastSuccessfulBookingDetails.project_description && (
                       <p className="mt-2"><strong>Project Description:</strong> {lastSuccessfulBookingDetails.project_description}</p>
                    )}
                     {/* Removed image_urls display */}
                     {/*
                     {lastSuccessfulBookingDetails.image_urls && lastSuccessfulBookingDetails.image_urls.length > 0 && (
                       <div className="mt-2">
                         <strong className="block mb-1">Project Images:</strong>
                         <ul className="list-disc list-inside pl-4">
                           {lastSuccessfulBookingDetails.image_urls.map((url, index) => (
                             <li key={index}><a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{url}</a></li>
                           ))}
                         </ul>
                       </div>
                     )}
                     */}
                  </div>
                )}
              </div>
            )}
            {bookingStatus === 'error' && <p className="text-red-600 mt-4 font-semibold text-center">{bookingError || 'Booking failed. Please try again or contact us.'}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to determine text color based on background hex
function getContrastYIQ(hexcolor: string): string {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

export default FreeQuote;
