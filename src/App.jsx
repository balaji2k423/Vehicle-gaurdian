import React, { useState, useEffect } from 'react';
import { Car, Phone, Calendar, AlertTriangle, TrendingUp, Wrench, Users, Bell, BarChart3, CheckCircle, Clock, DollarSign } from 'lucide-react';

const VehicleGuardianAI = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showVehicleDetail, setShowVehicleDetail] = useState(false);

  // Sample vehicle data with predictions
  const vehicles = [
    {
      id: 'VH001',
      model: 'Model X Sedan',
      owner: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      registration: 'DL-3C-AB-1234',
      prediction: {
        issue: 'Brake Pad Wear',
        severity: 'high',
        daysUntilFailure: 5,
        confidence: 91,
        recommendation: 'Schedule service within 5 days'
      },
      status: 'action_needed',
      telemetrics: {
        engineOilLevel: 45,
        brakePadThickness: 22,
        batteryHealth: 88,
        tireCondition: 75,
        coolantLevel: 92,
        fuelEfficiency: 14.5,
        mileage: 48250,
        lastServiceDate: '2024-08-15',
        nextServiceDue: '2024-12-20',
        engineTemp: 92,
        transmissionHealth: 94
      }
    },
    {
      id: 'VH002',
      model: 'Model Y SUV',
      owner: 'Priya Sharma',
      phone: '+91 98765 43211',
      registration: 'MH-02-CD-5678',
      prediction: {
        issue: 'Battery Health Degradation',
        severity: 'medium',
        daysUntilFailure: 12,
        confidence: 88,
        recommendation: 'Battery replacement recommended'
      },
      status: 'scheduled',
      telemetrics: {
        engineOilLevel: 78,
        brakePadThickness: 68,
        batteryHealth: 62,
        tireCondition: 82,
        coolantLevel: 88,
        fuelEfficiency: 12.8,
        mileage: 62180,
        lastServiceDate: '2024-09-10',
        nextServiceDue: '2025-01-10',
        engineTemp: 89,
        transmissionHealth: 91
      }
    },
    {
      id: 'VH003',
      model: 'Model Z Hatchback',
      owner: 'Amit Patel',
      phone: '+91 98765 43212',
      registration: 'GJ-01-EF-9012',
      prediction: {
        issue: 'Engine Oil Quality',
        severity: 'low',
        daysUntilFailure: 21,
        confidence: 86,
        recommendation: 'Oil change due soon'
      },
      status: 'monitoring',
      telemetrics: {
        engineOilLevel: 38,
        brakePadThickness: 85,
        batteryHealth: 94,
        tireCondition: 88,
        coolantLevel: 85,
        fuelEfficiency: 16.2,
        mileage: 35420,
        lastServiceDate: '2024-10-05',
        nextServiceDue: '2025-02-05',
        engineTemp: 88,
        transmissionHealth: 96
      }
    }
  ];

  const serviceCenterStats = {
    utilizationRate: 87,
    monthlyRevenue: '₹54L',
    avgServiceTime: '38 min',
    scheduledAppointments: 92,
    forecastedAppointments: {
      week1: 142,
      week2: 156,
      week3: 138,
      week4: 161
    }
  };

  const handleVoiceCall = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCallInProgress(true);
    setNotifications([...notifications, {
      id: Date.now(),
      type: 'call_initiated',
      vehicle: vehicle.registration,
      message: `Voice AI calling ${vehicle.owner}...`
    }]);

    // Simulate call completion
    setTimeout(() => {
      setCallInProgress(false);
      setNotifications([...notifications, {
        id: Date.now() + 1,
        type: 'call_completed',
        vehicle: vehicle.registration,
        message: `Call completed. ${vehicle.owner} agreed to schedule service.`
      }]);
    }, 3000);
  };

  const handleViewVehicleDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleDetail(true);
  };

  const getHealthColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (value) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const VehicleDetailView = () => {
    if (!selectedVehicle) return null;
    const tel = selectedVehicle.telemetrics;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <Car className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedVehicle.registration}</h2>
                  <p className="text-blue-100 text-lg">{selectedVehicle.model}</p>
                  <p className="text-blue-200 text-sm mt-1">Owner: {selectedVehicle.owner}</p>
                </div>
              </div>
              <button
                onClick={() => setShowVehicleDetail(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Total Mileage</p>
                <p className="text-2xl font-bold">{tel.mileage.toLocaleString()} km</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Last Service</p>
                <p className="text-2xl font-bold">{new Date(tel.lastServiceDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Next Service Due</p>
                <p className="text-2xl font-bold">{new Date(tel.nextServiceDue).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Alert Banner */}
            {selectedVehicle.prediction.severity === 'high' && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-900">Immediate Attention Required</h4>
                    <p className="text-sm text-red-800 mt-1">{selectedVehicle.prediction.issue} - {selectedVehicle.prediction.recommendation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Critical Components */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Critical Component Health
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Engine Oil */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">Engine Oil Level</span>
                    </div>
                    <span className={`text-3xl font-bold ${getHealthColor(tel.engineOilLevel)}`}>{tel.engineOilLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${getHealthBgColor(tel.engineOilLevel)} transition-all duration-500`}
                      style={{ width: `${tel.engineOilLevel}%` }}
                    />
                  </div>
                  {tel.engineOilLevel < 50 && (
                    <p className="text-sm text-orange-700 mt-2 font-medium">⚠️ Oil change recommended soon</p>
                  )}
                </div>

                {/* Brake Pads */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-500 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">Brake Pad Thickness</span>
                    </div>
                    <span className={`text-3xl font-bold ${getHealthColor(tel.brakePadThickness)}`}>{tel.brakePadThickness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${getHealthBgColor(tel.brakePadThickness)} transition-all duration-500`}
                      style={{ width: `${tel.brakePadThickness}%` }}
                    />
                  </div>
                  {tel.brakePadThickness < 50 && (
                    <p className="text-sm text-red-700 mt-2 font-medium">🚨 Critical: Brake replacement needed</p>
                  )}
                </div>

                {/* Battery */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">Battery Health</span>
                    </div>
                    <span className={`text-3xl font-bold ${getHealthColor(tel.batteryHealth)}`}>{tel.batteryHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${getHealthBgColor(tel.batteryHealth)} transition-all duration-500`}
                      style={{ width: `${tel.batteryHealth}%` }}
                    />
                  </div>
                  {tel.batteryHealth < 70 && (
                    <p className="text-sm text-yellow-700 mt-2 font-medium">⚠️ Battery replacement recommended</p>
                  )}
                </div>

                {/* Tire Condition */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">Tire Condition</span>
                    </div>
                    <span className={`text-3xl font-bold ${getHealthColor(tel.tireCondition)}`}>{tel.tireCondition}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${getHealthBgColor(tel.tireCondition)} transition-all duration-500`}
                      style={{ width: `${tel.tireCondition}%` }}
                    />
                  </div>
                  {tel.tireCondition >= 80 && (
                    <p className="text-sm text-green-700 mt-2 font-medium">✓ Tire condition excellent</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Parameters */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Additional Diagnostics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Coolant Level</p>
                  <p className={`text-2xl font-bold ${getHealthColor(tel.coolantLevel)}`}>{tel.coolantLevel}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Engine Temp</p>
                  <p className="text-2xl font-bold text-blue-600">{tel.engineTemp}°C</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Fuel Efficiency</p>
                  <p className="text-2xl font-bold text-green-600">{tel.fuelEfficiency} km/l</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Transmission</p>
                  <p className={`text-2xl font-bold ${getHealthColor(tel.transmissionHealth)}`}>{tel.transmissionHealth}%</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  setShowVehicleDetail(false);
                  handleVoiceCall(selectedVehicle);
                }}
                disabled={selectedVehicle.status === 'scheduled' || callInProgress}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedVehicle.status === 'scheduled' || callInProgress
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Phone className="w-5 h-5" />
                {selectedVehicle.status === 'scheduled' ? 'Already Scheduled' : 'Call Customer'}
              </button>
              <button
                onClick={() => setShowVehicleDetail(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Breakdown Prevention</p>
              <p className="text-3xl font-bold mt-1">67%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Annual ROI</p>
              <p className="text-3xl font-bold mt-1">6,753%</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Voice Engagement</p>
              <p className="text-3xl font-bold mt-1">48%</p>
            </div>
            <Phone className="w-10 h-10 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Payback Period</p>
              <p className="text-3xl font-bold mt-1">2.1 mo</p>
            </div>
            <Clock className="w-10 h-10 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Vehicles Requiring Action */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" />
          Vehicles Requiring Immediate Action
        </h3>
        <div className="space-y-4">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className={`border-l-4 ${
              vehicle.prediction.severity === 'high' ? 'border-red-500' : 
              vehicle.prediction.severity === 'medium' ? 'border-yellow-500' : 
              'border-blue-500'
            } bg-gray-50 p-4 rounded-r-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-5 h-5" />
                    <span className="font-semibold">{vehicle.registration}</span>
                    <span className="text-gray-600">- {vehicle.owner}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Issue Predicted</p>
                      <p className="font-medium">{vehicle.prediction.issue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Days Until Failure</p>
                      <p className="font-medium text-red-600">{vehicle.prediction.daysUntilFailure} days</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Confidence</p>
                      <p className="font-medium">{vehicle.prediction.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        vehicle.status === 'action_needed' ? 'bg-red-100 text-red-700' :
                        vehicle.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {vehicle.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleViewVehicleDetails(vehicle)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
                  >
                    <Car className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleVoiceCall(vehicle)}
                    disabled={vehicle.status === 'scheduled' || callInProgress}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      vehicle.status === 'scheduled' || callInProgress
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Voice Call
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ServiceCenterView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6">Service Center Operations Dashboard</h3>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Capacity Utilization</p>
            <p className="text-2xl font-bold text-blue-600">{serviceCenterStats.utilizationRate}%</p>
            <p className="text-xs text-green-600 mt-1">+50% vs previous</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <p className="text-2xl font-bold text-green-600">{serviceCenterStats.monthlyRevenue}</p>
            <p className="text-xs text-green-600 mt-1">+28% growth</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Avg Service Time</p>
            <p className="text-2xl font-bold text-purple-600">{serviceCenterStats.avgServiceTime}</p>
            <p className="text-xs text-green-600 mt-1">-39% reduction</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Pre-scheduled</p>
            <p className="text-2xl font-bold text-orange-600">{serviceCenterStats.scheduledAppointments}%</p>
            <p className="text-xs text-green-600 mt-1">+300% improvement</p>
          </div>
        </div>

        {/* 4-Week Forecast */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            4-Week Appointment Forecast
          </h4>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(serviceCenterStats.forecastedAppointments).map(([week, count], index) => (
              <div key={week} className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Week {index + 1}</p>
                <p className="text-3xl font-bold text-indigo-600">{count}</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(count / 180) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-600">Parts Alert</p>
              <p className="font-medium mt-1">Order 95 brake pad sets, 42 batteries by Monday</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-600">Staffing</p>
              <p className="font-medium mt-1">Schedule 8 techs Mon-Wed, 12 Thu-Sat</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-600">Revenue Forecast</p>
              <p className="font-medium mt-1">₹8.4L projected (118% vs last month)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VoiceAIView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Phone className="text-blue-600" />
          Voice AI Engagement System
        </h3>
        
        {callInProgress && selectedVehicle && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white animate-bounce" />
              </div>
              <div>
                <p className="font-bold text-lg">Call in Progress</p>
                <p className="text-gray-600">Calling {selectedVehicle.owner}...</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-600 mb-2">AI Script:</p>
              <p className="italic">"Hello {selectedVehicle.owner}, this is VehicleGuardian AI calling about your {selectedVehicle.model}. We've detected that your {selectedVehicle.prediction.issue.toLowerCase()} needs attention within {selectedVehicle.prediction.daysUntilFailure} days. Would you like to schedule a service appointment?"</p>
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Voice Engagement Rate</p>
            <p className="text-3xl font-bold text-green-600">48%</p>
            <p className="text-xs text-gray-500 mt-1">vs 12% for apps</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Calls Today</p>
            <p className="text-3xl font-bold text-blue-600">127</p>
            <p className="text-xs text-gray-500 mt-1">89 appointments booked</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Avg Call Duration</p>
            <p className="text-3xl font-bold text-purple-600">2.3 min</p>
            <p className="text-xs text-gray-500 mt-1">Highly efficient</p>
          </div>
        </div>

        {/* Recent Call Log */}
        <div>
          <h4 className="font-bold mb-3">Recent Voice AI Calls</h4>
          <div className="space-y-2">
            {notifications.slice(-5).reverse().map(notif => (
              <div key={notif.id} className={`p-3 rounded-lg ${
                notif.type === 'call_completed' ? 'bg-green-50' : 'bg-blue-50'
              }`}>
                <div className="flex items-center gap-2">
                  {notif.type === 'call_completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Phone className="w-5 h-5 text-blue-600" />
                  )}
                  <span className="text-sm">{notif.message}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ManufacturingView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Wrench className="text-orange-600" />
          Manufacturing Insights & CAPA
        </h3>
        
        {/* Alert Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h4 className="font-bold text-red-900">Critical Alert: Premature Brake Pad Wear</h4>
              <p className="text-sm text-red-800 mt-1">23% increase detected in Model X, Batch #4523</p>
            </div>
          </div>
        </div>

        {/* CAPA Report */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6">
          <h4 className="font-bold text-lg mb-4">Real-Time CAPA Report - Week of Nov 4-10, 2025</h4>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Root Cause Analysis</p>
              <p className="mt-2">Supplier changed friction material composition in Sept 2025 without notification. New material shows 18% faster wear rate under high-temperature conditions.</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Corrective Action</p>
              <p className="mt-2">Revert to original specification immediately. Contact supplier to halt production with new material. Quality team to verify all stock.</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Preventive Action</p>
              <p className="mt-2">Inspect remaining 8,400 units in inventory. Implement supplier change notification protocol. Add material composition testing to QC checklist.</p>
            </div>
            
            <div className="bg-green-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 font-medium">Impact Assessment</p>
              <p className="mt-2 font-bold text-green-800">Prevented potential 12,000 warranty claims - ₹18Cr saved</p>
            </div>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Warranty Cost Reduction</p>
            <p className="text-2xl font-bold text-blue-600">40%</p>
            <p className="text-xs text-gray-500 mt-1">₹450Cr annual savings</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Feedback Loop Speed</p>
            <p className="text-2xl font-bold text-green-600">2-3 weeks</p>
            <p className="text-xs text-gray-500 mt-1">vs 4-6 months traditional</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Recalls Prevented</p>
            <p className="text-2xl font-bold text-purple-600">3-4</p>
            <p className="text-xs text-gray-500 mt-1">₹120Cr saved per recall</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Vehicle Detail Modal */}
      {showVehicleDetail && <VehicleDetailView />}
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Car className="w-8 h-8" />
                VehicleGuardian AI
              </h1>
              <p className="text-blue-100 mt-1">Autonomous Predictive Maintenance with Voice-First Intelligence</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">EY Techathon 6.0</p>
              <p className="font-semibold">Team Tech Saga</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'voiceai', label: 'Voice AI', icon: Phone },
              { id: 'servicecenter', label: 'Service Center', icon: Calendar },
              { id: 'manufacturing', label: 'Manufacturing', icon: Wrench }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeView === tab.id
                    ? 'border-b-4 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'voiceai' && <VoiceAIView />}
        {activeView === 'servicecenter' && <ServiceCenterView />}
        {activeView === 'manufacturing' && <ManufacturingView />}
      </div>

      {/* Notification Toast */}
      {notifications.length > 0 && (
        <div className="fixed bottom-6 right-6 space-y-2 max-w-md">
          {notifications.slice(-3).map(notif => (
            <div key={notif.id} className="bg-white rounded-lg shadow-xl p-4 border-l-4 border-blue-500 animate-slide-in">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleGuardianAI;