function drillDownState(stateName) {
    var wrCoverage = document.getElementById("map");
    wrCoverage.configureLink({
        type: "mscombidy2d",
        overlayButton: {
            message: 'Back',
            fontColor: '880000',
            bgColor: 'FFEEEE',
            borderColor: '660000'
        }
    }, 0);
    wrCoverage.render();
}

function initMap() {
    var uluru = { lat: 39.9698076, lng: -83.0643608 };
    var map = new google.maps.Map(document.getElementById('sideMap'), {
        center: uluru,
        zoom: 11
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    var marker2 = new google.maps.Marker({
        position: { lat: 39.975992, lng: -83.005954 },
        map: map
    });
}

//expose to the window scope
window.drillDownState = drillDownState;