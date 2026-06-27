// app.js - Raipur-Bhilai Heavy Vehicle Dust Mitigation Dashboard controller

// --- GLOBALS & DATA ---
const hotspotData = {
    urla: {
        name: "Urla Industrial Zone Corridor",
        aqi: 390,
        delay: "28 mins",
        dustfall: "72 g/m²/day",
        population: "190,000+",
        respiratory: "+32.0%",
        respiratoryVal: 72,
        asthma: "10.2%",
        asthmaVal: 51,
        exposure: "7.8x safe limit",
        exposureVal: 78,
        load: "Coal & Sponge Slag",
        speed: "42 km/h",
        releaserate: "380 g/min/truck",
        class: "16-Wheel Dumpers"
    },
    bhanpuri: {
        name: "Bhanpuri Slag Transport Link",
        aqi: 375,
        delay: "22 mins",
        dustfall: "68 g/m²/day",
        population: "140,000+",
        respiratory: "+29.5%",
        respiratoryVal: 66,
        asthma: "9.5%",
        asthmaVal: 48,
        exposure: "7.5x safe limit",
        exposureVal: 75,
        load: "Iron Ore / Slag Fines",
        speed: "45 km/h",
        releaserate: "350 g/min/truck",
        class: "16-Wheel Dumpers"
    },
    tatibandh: {
        name: "Tatibandh Ring Road Bypass Junction",
        aqi: 412,
        delay: "42 mins",
        dustfall: "85 g/m²/day",
        population: "285,000+",
        respiratory: "+38.5%",
        respiratoryVal: 85,
        asthma: "12.4%",
        asthmaVal: 62,
        exposure: "8.4x safe limit",
        exposureVal: 88,
        load: "Cement Clinker & Soil",
        speed: "48 km/h",
        releaserate: "420 g/min/truck",
        class: "16-Wheel Tippers"
    },
    powerhouse: {
        name: "Bhilai Steel Plant - Power House Link",
        aqi: 425,
        delay: "32 mins",
        dustfall: "90 g/m²/day",
        population: "310,000+",
        respiratory: "+41.2%",
        respiratoryVal: 92,
        asthma: "14.1%",
        asthmaVal: 70,
        exposure: "9.0x safe limit",
        exposureVal: 94,
        load: "Iron Ore & Coal Dust",
        speed: "40 km/h",
        releaserate: "450 g/min/truck",
        class: "Heavy Tippers"
    },
    nehrunagar: {
        name: "Nehru Nagar Highway Intersection",
        aqi: 310,
        delay: "18 mins",
        dustfall: "45 g/m²/day",
        population: "220,000+",
        respiratory: "+21.4%",
        respiratoryVal: 48,
        asthma: "7.8%",
        asthmaVal: 39,
        exposure: "6.2x safe limit",
        exposureVal: 62,
        load: "Construction Aggregates",
        speed: "50 km/h",
        releaserate: "260 g/min/truck",
        class: "Transit Mixers"
    }
};

const techData = {
    tarp: {
        title: "Electromagnetic Sealed Retractable Tarp",
        desc: "An automated heavy-duty roll-up cover that hermetically seals the open top of dumper bodies.",
        specs: [
            "<strong>Material:</strong> 1200 GSM PVC-coated high-tenacity polyester, double UV-lacquered.",
            "<strong>Flange Sealing:</strong> Integrated electromagnet guide tracks powered by vehicle alternator (24VDC), clamping side seams to avoid aerodynamic flutter.",
            "<strong>Control Mechanism:</strong> Pneumatically-actuated gear-drive, operates from driver cabin in 12 seconds.",
            "<strong>Dust Suppression Efficiency:</strong> Eliminates 99.2% of top-blown spillage at highway speeds.",
            "<strong>Unit Cost:</strong> ₹24,000 per retrofitting kit."
        ]
    },
    diffuser: {
        title: "Rear Aerodynamic Shroud (Vortex Diffuser)",
        desc: "A custom-molded trailing aero shroud designed to neutralize the low-pressure pocket behind high-sided cargo beds.",
        specs: [
            "<strong>Material:</strong> Lightweight Fiber-Reinforced Polymer (FRP) core with carbon weave layers.",
            "<strong>Aerodynamic Design:</strong> Dual-channel boundary layer diverter. Deflects incoming high-pressure roof air downwards behind the tailgate.",
            "<strong>Engineering Target:</strong> Reduces trailing wake turbulence (drag coefficient C_d reduced by 0.12), stabilizing dust particles inside the tail bed.",
            "<strong>Turbulence Suppression:</strong> Lowers pavement dust resuspension by 78%.",
            "<strong>Unit Cost:</strong> ₹18,000 per dumper installation."
        ]
    },
    mistbar: {
        title: "Electrostatic Micro-Mist Sprayer Bar",
        desc: "An active rear-mounted spray bar emitting negatively charged micro-droplets to capture escaping dust particulates.",
        specs: [
            "<strong>Droplet Atomization:</strong> Stainless steel high-pressure nozzle array, creating 15-40 micron water droplets.",
            "<strong>Electrostatic Induction:</strong> Direct induction ring chargers creating a -5kV bias on water exit, forcing droplets to wrap around and bind to ground-neutral PM2.5/PM10 dust particles.",
            "<strong>Consumable Efficiency:</strong> Demands only 18-20 L/hour of water, compared to 150+ L/hour of uncharged sprinklers.",
            "<strong>Capture Efficiency:</strong> 94.5% capture of respirable dust in the vehicle wake.",
            "<strong>Unit Cost:</strong> ₹32,000 per assembly."
        ]
    },
    iot: {
        title: "IoT PM Sensor & Smart Telematics Hub",
        desc: "A smart vehicle-mounted computer that monitors dust output and coordinates active suppression.",
        specs: [
            "<strong>Sensing Array:</strong> Dual laser scattering particle count chamber (tracking real-time PM2.5 and PM10 output).",
            "<strong>Closed-Loop Spray Control:</strong> Reads vehicle velocity (via OBD-II) and ambient humidity to modulate electrostatic mist pump duty-cycle.",
            "<strong>Telematics Gateway:</strong> Cellular GPS modem logging geo-referenced emissions, transmitting spillage alerts to central dispatch dashboard.",
            "<strong>System Overhead:</strong> Negligible battery drain (<35W peak load).",
            "<strong>Unit Cost:</strong> ₹11,000 per hardware unit."
        ]
    }
};

let ambientChart = null;

// --- PAGE NAVIGATION ---
function switchPage(pageNum) {
    // Toggle active sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Toggle sidebar buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeSection = document.getElementById(`page-${pageNum}`);
    const activeBtn = document.getElementById(`btn-page${pageNum}`);
    
    if(activeSection) activeSection.classList.add('active');
    if(activeBtn) activeBtn.classList.add('active');
    
    // Update titles
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    
    if (pageNum === 1) {
        title.innerText = "Regional Air Quality & Pain Diagnostics";
        subtitle.innerText = "Mapping vehicle dust density, highway traffic delays, and regional health exposure";
    } else {
        title.innerText = "VEMT Retrofit Solution & Optimization Impact";
        subtitle.innerText = "Simulating engineering retrofitting specifications, spillage recovery, and investment payback timelines";
        // Initialize ROI and Chart.js when entering page 2
        setTimeout(() => {
            calculateROI();
            initChart();
        }, 100);
    }
}

// --- INTERACTIVE MAP HOTSPOTS (PAGE 1) ---
function showHotspot(hotspotKey) {
    const data = hotspotData[hotspotKey];
    if (!data) return;

    // Update names
    document.getElementById('hotspot-name').innerText = data.name;
    document.getElementById('hs-aqi').innerText = data.aqi;
    document.getElementById('hs-delay').innerText = data.delay;
    document.getElementById('hs-dustfall').innerText = data.dustfall;
    document.getElementById('hs-pop').innerText = data.population;
    
    // Health progress bar stats
    document.getElementById('hs-respiratory-stat').innerText = data.respiratory;
    document.getElementById('hs-respiratory-bar').style.width = `${data.respiratoryVal}%`;
    
    document.getElementById('hs-asthma-stat').innerText = data.asthma;
    document.getElementById('hs-asthma-bar').style.width = `${data.asthmaVal}%`;
    
    document.getElementById('hs-exposure-stat').innerText = data.exposure;
    document.getElementById('hs-exposure-bar').style.width = `${data.exposureVal}%`;

    // Outflow specs
    document.getElementById('hs-load').innerText = data.load;
    document.getElementById('hs-speed').innerText = data.speed;
    document.getElementById('hs-releaserate').innerText = data.releaserate;
    document.getElementById('hs-class').innerText = data.class;

    // Pulse colors update based on AQI
    const aqiBox = document.getElementById('hs-aqi');
    aqiBox.className = "value";
    if (data.aqi > 400) {
        aqiBox.classList.add('text-worst');
    } else if (data.aqi > 350) {
        aqiBox.classList.add('text-worst');
    } else {
        aqiBox.classList.add('text-warning');
    }
}

// --- VEMT SPEC INSPECTOR (PAGE 2) ---
function selectTech(techKey) {
    const data = techData[techKey];
    if (!data) return;

    // Highlight selected in schematic (optional CSS triggers)
    document.querySelectorAll('.retrofit-part').forEach(part => {
        part.style.filter = "none";
    });

    const activeClassMap = {
        tarp: '.top-tarp',
        diffuser: '.vortex-diffuser',
        mistbar: '.mist-bar',
        iot: '.iot-module'
    };

    const element = document.querySelector(activeClassMap[techKey]);
    if (element) {
        element.style.filter = "drop-shadow(0 0 8px rgba(6, 182, 212, 1)) brightness(1.2)";
    }

    // Populate spec box
    const specsContainer = document.getElementById('tech-details-content');
    let specsHtml = `<p>${data.desc}</p><ul>`;
    data.specs.forEach(spec => {
        specsHtml += `<li>${spec}</li>`;
    });
    specsHtml += `</ul>`;

    document.getElementById('tech-title').innerText = data.title;
    specsContainer.innerHTML = specsHtml;
}

// --- ROI & ECONOMIC CALCULATOR (PAGE 2) ---
function calculateROI() {
    // Inputs
    const fleetSize = parseInt(document.getElementById('calc-fleet-size').value);
    const avgDist = parseInt(document.getElementById('calc-avg-dist').value);
    const oreValue = parseInt(document.getElementById('calc-ore-value').value);
    const tripsPerMonth = parseInt(document.getElementById('calc-trips').value);

    // Update labels
    document.getElementById('val-fleet-size').innerText = fleetSize;
    document.getElementById('val-avg-dist').innerText = avgDist + " km";
    document.getElementById('val-ore-value').innerText = "₹" + oreValue.toLocaleString('en-IN');
    document.getElementById('val-trips').innerText = tripsPerMonth;

    // Constants
    const KIT_COST = 85000; // Complete VEMT retrofit kit price (₹85k)
    // Standard spillage: ~60 kg loss of ore/coal cargo per 10km (6 kg/km)
    // VEMT saves 97% of this spillage.
    const spillageLossPerKmInTons = 0.006; 
    const recoveryEfficiency = 0.97;
    
    // Calculations
    const capitalCost = fleetSize * KIT_COST;
    
    // Spillage Saved (Tons per year)
    const spillageSavedPerTripTons = spillageLossPerKmInTons * avgDist * recoveryEfficiency;
    const totalSpillageSavedYearTons = spillageSavedPerTripTons * tripsPerMonth * 12 * fleetSize;
    const yearlySavingsRupees = totalSpillageSavedYearTons * oreValue;

    // Payback Period (Months)
    let paybackMonths = 0;
    if (yearlySavingsRupees > 0) {
        paybackMonths = (capitalCost / (yearlySavingsRupees / 12));
    }
    
    // Carbon Credit potential
    // Estimate: ~₹16,800 saved per retrofitted truck per year in PM emission reduction credits
    const carbonCreditsYearly = fleetSize * 16800;

    // Update displays
    document.getElementById('roi-capital').innerText = "₹" + formatIndianCurrency(capitalCost);
    document.getElementById('roi-spillage').innerText = "₹" + formatIndianCurrency(Math.round(yearlySavingsRupees));
    document.getElementById('roi-payback').innerText = paybackMonths > 12 ? 
        (paybackMonths / 12).toFixed(1) + " Years" : paybackMonths.toFixed(1) + " Months";
    document.getElementById('roi-carbon').innerText = "₹" + formatIndianCurrency(carbonCreditsYearly);
}

// Indian Currency Formatter helper (Lakhs/Crores)
function formatIndianCurrency(num) {
    const x = num.toString();
    let lastThree = x.substring(x.length - 3);
    const otherSymbols = x.substring(0, x.length - 3);
    if (otherSymbols !== '') {
        lastThree = ',' + lastThree;
    }
    const res = otherSymbols.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

// --- AMBIENT AQI CHART (PAGE 2) ---
function initChart() {
    const ctx = document.getElementById('ambientChart').getContext('2d');
    if (ambientChart) {
        ambientChart.destroy();
    }

    // Simulated 12-month ambient PM10 forecasting for the Raipur-Bhilai highway
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Baseline PM10 (Unmitigated) peaks in winter months (Nov - Feb)
    const basePM10 = [440, 410, 320, 260, 210, 150, 120, 110, 160, 290, 390, 460];
    // Retrofitted PM10 drops significantly (combining vehicle dust containment and reduced secondary road dust)
    const retroPM10 = [110, 105, 85, 70, 60, 48, 38, 35, 45, 75, 95, 115];

    ambientChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Existing Scenario (No Dust Mitigation)',
                    data: basePM10,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#ef4444',
                    pointRadius: 3,
                    tension: 0.35,
                    fill: true
                },
                {
                    label: 'Optimized Scenario (VEMT Retrofitted Fleet)',
                    data: retroPM10,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#10b981',
                    pointRadius: 3,
                    tension: 0.35,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#8fa0c4',
                        font: {
                            family: 'Outfit',
                            size: 11
                        }
                    }
                },
                tooltip: {
                    titleFont: { family: 'Outfit', weight: 'bold' },
                    bodyFont: { family: 'Outfit' }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'PM10 Concentration (µg/m³)',
                        color: '#8fa0c4',
                        font: { family: 'Outfit', size: 10 }
                    },
                    grid: {
                        color: 'rgba(30, 54, 104, 0.2)'
                    },
                    ticks: {
                        color: '#8fa0c4',
                        font: { family: 'Outfit' }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(30, 54, 104, 0.2)'
                    },
                    ticks: {
                        color: '#8fa0c4',
                        font: { family: 'Outfit' }
                    }
                }
            }
        }
    });
}

// --- INIT APP ---
window.onload = function() {
    // Run icon engine
    lucide.createIcons();

    // Default: load Tatibandh diagnostic data
    showHotspot('tatibandh');
    
    // Update live system time block
    const date = new Date();
    const formattedDate = date.getFullYear() + '-' + 
                          String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(date.getDate()).padStart(2, '0') + ' ' + 
                          String(date.getHours()).padStart(2, '0') + ':' + 
                          String(date.getMinutes()).padStart(2, '0');
    const timeElem = document.getElementById('system-time');
    if (timeElem) timeElem.innerText = formattedDate;
};
