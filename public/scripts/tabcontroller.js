var patientChart = angular.module('patientChart', ['ng-fusioncharts']);

patientChart.controller('summaryController', SummaryController);
patientChart.controller('TabController', TabController);
patientChart.controller('visitController', visitCtrl);
patientChart.controller('physicianController', physicianCtrl);
patientChart.controller('patientController', patientCtrl);
patientChart.controller('complaintController', complaintCtrl);
patientChart.controller('diagnosesController', DiagnosesCtrl);
patientChart.controller('medicationController', medicationCtrl);


function TabController($scope) {
    $scope.activeTab = 0;
    $scope.tabs = [
        { text: 'Summary', url: "/partials/Summary.html" },
        { text: 'Visits', url: "/partials/Visits.html" },
        { text: 'Physicians', url: "/partials/Physicians.html" },
        { text: 'Patients', url: "/partials/Patients.html" },
        { text: 'Complaints', url: "/partials/Complaints.html" },
        { text: 'Diagnoses', url: "/partials/Diagnoses.html" },
        { text: 'Medications', url: "/partials/Medications.html" }
    ];
    $scope.isSelected = function(index) {
        return ($scope.activeTab === index);
    };
    $scope.selectTab = function(tabIndex) {
        $scope.activeTab = tabIndex;
    };
};

function SummaryController($scope) {
    $scope.content = [{
            header: "Visits",
            type: "area2d",
            dataSource: {
                //"caption": "Visits",
                //"captionFontSize": "30",
                // more chart properties - explained later
                "xaxisname": "Month",
                "paletteColors": "#6baa01",
                "usePlotGradientColor": "0",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "showPlotBorder": "0",
                "showCanvasBorder": "0",
                "showXAxisLine": "1",
                "showYAxisLine": "0",
                "showYAxisValues": "0",
                "showXAxisValues": "1",
                "showAxisLines": "1",
                "axisLineAlpha": "25",
                "divLineAlpha": "10",
                "alignCaptionWithCanvas": "0",
                "showAlternateVGridColor": "0",
                "showValues": "0",
                "numVDivLines": "5",
                "vDivLineColor": "#99ccff",
                "vDivLineThickness": "1",
                "vDivLineAlpha": "50",
                "vDivLineDashed": "0",
                "theme": "fint"
            },

            categories: {
                "categories": [{
                    "category": [
                        { "label": "Jan" },
                        { "label": "Feb" },
                        { "label": "Mar" },
                        { "label": "Apr" },
                        { "label": "May" },
                        { "label": "Jun" },
                        { "label": "Jul" },
                        { "label": "Aug" },
                        { "label": "Sep" },
                        { "label": "Oct" },
                        { "label": "Nov" },
                        { "label": "Dec" }
                    ]
                }]
            },
            dataset: [{
                "seriesname": "visits",
                "showvalues": "0",
                "data": [
                    { "value": "700" },
                    { "value": "750" },
                    { "value": "600" },
                    { "value": "300" },
                    { "value": "600" },
                    { "value": "900" },
                    { "value": "500" },
                    { "value": "450" },
                    { "value": "700" },
                    { "value": "600" },
                    { "value": "700" },
                    { "value": "750" }
                ]
            }]
        },
        {
            header: "Insurance",
            type: "msbar2d",
            dataSource: {
                "yAxisName": "Cost (In USD)",
                "numberPrefix": "$",
                "paletteColors": "#0075c2",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "placeValuesInside": "1",
                "valueFontColor": "#ffffff",
                "showAxisLines": "1",
                "axisLineAlpha": "25",
                "divLineAlpha": "10",
                "alignCaptionWithCanvas": "0",
                "showAlternateVGridColor": "0",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
                "baseFont": "Arial"
            },

            categories: [{
                "category": [
                    { "label": "Insurance A" },
                    { "label": "Insurance B" },
                    { "label": "Insurance C" },
                    { "label": "Insurance D" },
                    { "label": "Insurance E" }
                ]
            }],
            dataset: [{
                "seriesname": "insurance",
                "data": [
                    { "value": "700" },
                    { "value": "750" },
                    { "value": "600" },
                    { "value": "300" },
                    { "value": "600" }
                ]
            }]
        }
    ];

    $scope.patientDemographic = {
        header: "Patient Demographics",
        type: "maps/usa",
        dataSource: {
            "chart": {
                "caption": "Unemployment Numbers",
                "subcaption": "by State",
                "entityFillHoverColor": "#cccccc",
                "showLabels": "1",
                "theme": "fint"
            },
            "colorrange": {
                "minvalue": "920000",
                "startlabel": "Low",
                "endlabel": "High",
                "code": "#D8F0FC",
                "gradient": "1",
                "color": [{
                        "maxvalue": "56580000",
                        "displayvalue": "Average",
                        "code": "#84D2F7"
                    },
                    {
                        "maxvalue": "97400000",
                        "code": "#3DB2ED"
                    }
                ]
            },
            "data": [{
                    "id": "HI",
                    "value": "3189000",
                    "link": "j-drillDownState-HI|Hawaii"
                },
                {
                    "id": "DC",
                    "value": "2879000",
                    "link": "j-drillDownState-DC|District of Columbia"
                },
                {
                    "id": "MD",
                    "value": "33592000",
                    "link": "j-drillDownState-MD|Maryland"
                },
                {
                    "id": "DE",
                    "value": "4607000",
                    "link": "j-drillDownState-DE|Delaware"
                },
                {
                    "id": "RI",
                    "value": "4890000",
                    "link": "j-drillDownState-RI|Rhode Island"
                },
                {
                    "id": "WA",
                    "value": "34927000",
                    "link": "j-drillDownState-WA|Washington"
                },
                {
                    "id": "OR",
                    "value": "65798000",
                    "link": "j-drillDownState-OR|Oregon"
                },
                {
                    "id": "CA",
                    "value": "61861000",
                    "link": "j-drillDownState-CA|California"
                },
                {
                    "id": "AK",
                    "value": "58911000",
                    "link": "j-drillDownState-AK|Alaska"
                },
                {
                    "id": "ID",
                    "value": "42662000",
                    "link": "j-drillDownState-ID|Idaho"
                },
                {
                    "id": "NV",
                    "value": "78041000",
                    "link": "j-drillDownState-NV|Nevada"
                },
                {
                    "id": "AZ",
                    "value": "41558000",
                    "link": "j-drillDownState-AZ|Arizona"
                },
                {
                    "id": "MT",
                    "value": "62942000",
                    "link": "j-drillDownState-MT|Montana"
                },
                {
                    "id": "WY",
                    "value": "78834000",
                    "link": "j-drillDownState-WY|Wyoming"
                },
                {
                    "id": "UT",
                    "value": "50512000",
                    "link": "j-drillDownState-UT|Utah"
                },
                {
                    "id": "CO",
                    "value": "73026000",
                    "link": "j-drillDownState-CO|Colorado"
                },
                {
                    "id": "NM",
                    "value": "78865000",
                    "link": "j-drillDownState-NM|New Mexico"
                },
                {
                    "id": "ND",
                    "value": "50554000",
                    "link": "j-drillDownState-ND|North Dakota"
                },
                {
                    "id": "SD",
                    "value": "35922000",
                    "link": "j-drillDownState-SD|South Dakota"
                },
                {
                    "id": "NE",
                    "value": "43736000",
                    "link": "j-drillDownState-NE|Nebraska"
                },
                {
                    "id": "KS",
                    "value": "32681000",
                    "link": "j-drillDownState-KS|Kansas"
                },
                {
                    "id": "OK",
                    "value": "79038000",
                    "link": "j-drillDownState-OK|Oklahoma"
                },
                {
                    "id": "TX",
                    "value": "97344000",
                    "link": "j-drillDownState-TX|Texas"
                },
                {
                    "id": "MN",
                    "value": "43485000",
                    "link": "j-drillDownState-MN|Minnesota"
                },
                {
                    "id": "IA",
                    "value": "46515000",
                    "link": "j-drillDownState-IA|Iowa"
                },
                {
                    "id": "MO",
                    "value": "63715000",
                    "link": "j-drillDownState-MO|Missouri"
                },
                {
                    "id": "AR",
                    "value": "34497000",
                    "link": "j-drillDownState-AR|Arkansas"
                },
                {
                    "id": "LA",
                    "value": "70706000",
                    "link": "j-drillDownState-LA|Louisiana"
                },
                {
                    "id": "WI",
                    "value": "42382000",
                    "link": "j-drillDownState-WI|Wisconsin"
                },
                {
                    "id": "IL",
                    "value": "73202000",
                    "link": "j-drillDownState-IL|Illinois"
                },
                {
                    "id": "KY",
                    "value": "79118000",
                    "link": "j-drillDownState-KY|Kentucky"
                },
                {
                    "id": "TN",
                    "value": "44657000",
                    "link": "j-drillDownState-TN|Tennessee"
                },
                {
                    "id": "MS",
                    "value": "66205000",
                    "link": "j-drillDownState-MS|Mississippi"
                },
                {
                    "id": "AL",
                    "value": "75873000",
                    "link": "j-drillDownState-AL|Alabama"
                },
                {
                    "id": "GA",
                    "value": "76895000",
                    "link": "j-drillDownState-GA|Georgia"
                },
                {
                    "id": "MI",
                    "value": "67695000",
                    "link": "j-drillDownState-MI|Michigan"
                },
                {
                    "id": "IN",
                    "value": "920000",
                    "link": "j-drillDownState-IN|Indiana"
                },
                {
                    "id": "OH",
                    "value": "32960000",
                    "link": "newchart-json-ohio"
                },
                {
                    "id": "PA",
                    "value": "54346000",
                    "link": "j-drillDownState-PA|Pennsylvania"
                },
                {
                    "id": "NY",
                    "value": "42828000",
                    "link": "j-drillDownState-NY|New York"
                },
                {
                    "id": "VT",
                    "value": "77411000",
                    "link": "j-drillDownState-VT|Vermont"
                },
                {
                    "id": "NH",
                    "value": "51403000",
                    "link": "j-drillDownState-NH|New Hampshire"
                },
                {
                    "id": "ME",
                    "value": "64636000",
                    "link": "j-drillDownState-ME|Maine"
                },
                {
                    "id": "MA",
                    "value": "51767000",
                    "link": "j-drillDownState-MA|Massachusetts"
                },
                {
                    "id": "CT",
                    "value": "57353000",
                    "link": "j-drillDownState-CT|Connecticut"
                },
                {
                    "id": "NJ",
                    "value": "80788000",
                    "link": "j-drillDownState-NJ|New Jersey"
                },
                {
                    "id": "WV",
                    "value": "95890000",
                    "link": "j-drillDownState-WV|West Virginia"
                },
                {
                    "id": "VA",
                    "value": "83140000",
                    "link": "j-drillDownState-VA|Virginia"
                },
                {
                    "id": "NC",
                    "value": "75425000",
                    "link": "j-drillDownState-NC|North Carolina"
                },
                {
                    "id": "SC",
                    "value": "88234000",
                    "link": "j-drillDownState-SC|South Carolina"
                },
                {
                    "id": "FL",
                    "value": "88234000",
                    "link": "j-drillDownState-FL|Florida"
                }
            ]
        },
        "linkeddata": [{
            "id": "ohio",
            "linkedchart": {
                "chart": {
                    "animation": "0",
                    "showbevel": "0",
                    "usehovercolor": "1",
                    "canvasbordercolor": "FFFFFF",
                    "bordercolor": "FFFFFF",
                    "showlegend": "1",
                    "showshadow": "0",
                    "legendposition": "BOTTOM",
                    "legendborderalpha": "0",
                    "legendbordercolor": "ffffff",
                    "legendallowdrag": "0",
                    "legendshadow": "0",
                    "caption": "Website Visits for the month of Jan 2014",
                    "connectorcolor": "000000",
                    "fillalpha": "80",
                    "hovercolor": "CCCCCC",
                    "showborder": 0
                },
                "colorrange": {
                    "minvalue": "0",
                    "startlabel": "Low",
                    "endlabel": "High",
                    "code": "e44a00",
                    "gradient": "1",
                    "color": [{
                            "maxvalue": 30000,
                            "displayvalue": "Average",
                            "code": "f8bd19"
                        },
                        {
                            "maxvalue": 100000,
                            "code": "6baa01"
                        }
                    ],
                    "maxvalue": 0
                },
                "data": [{
                    "data": [{
                            "id": "101",
                            "value": "2145"
                        },
                        {
                            "id": "103",
                            "value": "4998"
                        },
                        {
                            "id": "105",
                            "value": "1857"
                        },
                        {
                            "id": "107",
                            "value": "4349"
                        },
                        {
                            "id": "109",
                            "value": "588"
                        },
                        {
                            "id": "111",
                            "value": "2699"
                        },
                        {
                            "id": "113",
                            "value": "897"
                        },
                        {
                            "id": "115",
                            "value": "1783"
                        },
                        {
                            "id": "117",
                            "value": "4629"
                        },
                        {
                            "id": "119",
                            "value": "46447"
                        },
                        {
                            "id": "121",
                            "value": "50040"
                        },
                        {
                            "id": "123",
                            "value": "64429"
                        },
                        {
                            "id": "125",
                            "value": "36929"
                        },
                        {
                            "id": "127",
                            "value": "72861"
                        },
                        {
                            "id": "129",
                            "value": "61322"
                        },
                        {
                            "id": "131",
                            "value": "70836"
                        },
                        {
                            "id": "133",
                            "value": "67598"
                        },
                        {
                            "id": "135",
                            "value": "70500"
                        },
                        {
                            "id": "137",
                            "value": "55658"
                        },
                        {
                            "id": "139",
                            "value": "38017"
                        },
                        {
                            "id": "141",
                            "value": "59513"
                        },
                        {
                            "id": "143",
                            "value": "43006"
                        },
                        {
                            "id": "145",
                            "value": "43452"
                        },
                        {
                            "id": "147",
                            "value": "33751"
                        },
                        {
                            "id": "149",
                            "value": "31318"
                        },
                        {
                            "id": "151",
                            "value": "67847"
                        },
                        {
                            "id": "153",
                            "value": "57684"
                        },
                        {
                            "id": "155",
                            "value": "32270"
                        },
                        {
                            "id": "157",
                            "value": "58206"
                        },
                        {
                            "id": "159",
                            "value": "35473"
                        },
                        {
                            "id": "161",
                            "value": "53126"
                        },
                        {
                            "id": "163",
                            "value": "40198"
                        },
                        {
                            "id": "165",
                            "value": "45083"
                        },
                        {
                            "id": "167",
                            "value": "50327"
                        },
                        {
                            "id": "169",
                            "value": "71818"
                        },
                        {
                            "id": "171",
                            "value": "78519"
                        },
                        {
                            "id": "173",
                            "value": "62088"
                        },
                        {
                            "id": "175",
                            "value": "51150"
                        },
                        {
                            "id": "009",
                            "value": "53958"
                        },
                        {
                            "id": "073",
                            "value": "75984"
                        },
                        {
                            "id": "045",
                            "value": "50112"
                        },
                        {
                            "id": "079",
                            "value": "67641"
                        },
                        {
                            "id": "053",
                            "value": "52638"
                        },
                        {
                            "id": "087",
                            "value": "46915"
                        },
                        {
                            "id": "001",
                            "value": "46794"
                        },
                        {
                            "id": "071",
                            "value": "79364"
                        },
                        {
                            "id": "015",
                            "value": "56130"
                        },
                        {
                            "id": "025",
                            "value": "70653"
                        },
                        {
                            "id": "061",
                            "value": "32077"
                        },
                        {
                            "id": "017",
                            "value": "39661"
                        },
                        {
                            "id": "027",
                            "value": "48043"
                        },
                        {
                            "id": "047",
                            "value": "48726"
                        },
                        {
                            "id": "049",
                            "value": "56492"
                        },
                        {
                            "id": "097",
                            "value": "65107"
                        },
                        {
                            "id": "057",
                            "value": "77767"
                        },
                        {
                            "id": "023",
                            "value": "36181"
                        },
                        {
                            "id": "037",
                            "value": "34904"
                        },
                        {
                            "id": "021",
                            "value": "73998"
                        },
                        {
                            "id": "041",
                            "value": "48219"
                        },
                        {
                            "id": "089",
                            "value": "39474"
                        },
                        {
                            "id": "059",
                            "value": "59702"
                        },
                        {
                            "id": "013",
                            "value": "64937"
                        },
                        {
                            "id": "067",
                            "value": "56082"
                        },
                        {
                            "id": "081",
                            "value": "38761"
                        },
                        {
                            "id": "019",
                            "value": "69897"
                        },
                        {
                            "id": "031",
                            "value": "54939"
                        },
                        {
                            "id": "075",
                            "value": "68635"
                        },
                        {
                            "id": "083",
                            "value": "57128"
                        },
                        {
                            "id": "091",
                            "value": "42140"
                        },
                        {
                            "id": "011",
                            "value": "35960"
                        },
                        {
                            "id": "003",
                            "value": "72685"
                        },
                        {
                            "id": "065",
                            "value": "61334"
                        },
                        {
                            "id": "033",
                            "value": "60403"
                        },
                        {
                            "id": "005",
                            "value": "33401"
                        },
                        {
                            "id": "029",
                            "value": "51716"
                        },
                        {
                            "id": "099",
                            "value": "73064"
                        },
                        {
                            "id": "055",
                            "value": "47072"
                        },
                        {
                            "id": "007",
                            "value": "34313"
                        },
                        {
                            "id": "085",
                            "value": "93941"
                        },
                        {
                            "id": "035",
                            "value": "92269"
                        },
                        {
                            "id": "093",
                            "value": "95659"
                        },
                        {
                            "id": "043",
                            "value": "84855"
                        },
                        {
                            "id": "095",
                            "value": "90602"
                        },
                        {
                            "id": "077",
                            "value": "80262"
                        },
                        {
                            "id": "063",
                            "value": "94780"
                        },
                        {
                            "id": "039",
                            "value": "84943"
                        },
                        {
                            "id": "069",
                            "value": "87707"
                        },
                        {
                            "id": "051",
                            "value": "87707"
                        }
                    ]
                }]
            }
        }]
    }
};

function visitCtrl($scope) {
    $scope.content = [
        { header: "Type of Visit", data: "Office visit" },
        { header: "History", data: "Show breakdown of all past visits (graph)" }
    ];
}

function physicianCtrl($scope) {
    $scope.content = [
        { header: "Primary Care Physician", data: "Dr. Smith" }
    ];
}

function patientCtrl($scope) {
    $scope.content = [
        { header: "Name", data: "Mary Johnson" },
        { header: "Kids", data: "Daughter: July Johnson" }
    ];
}

function complaintCtrl($scope) {
    $scope.content = [
        { header: "History", data: "show history of complaints - chest pain, nausea, vomitting, etc. " }
    ];
}

function DiagnosesCtrl($scope) {
    $scope.content = [
        { header: "Current", data: "Pnemonia" },
        { header: "Family History", data: "No family history to note of" }
    ];
}

function medicationCtrl($scope) {
    $scope.content = [
        { header: "Current", data: "IV-fluid" },
        { header: "Drug History", data: "no family drug history" }
    ];
}