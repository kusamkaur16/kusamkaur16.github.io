import * as THREE from 'three'
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './index.css'

// CONSTANTS
// Get the size of the viewport
const SIZES = {
    width: window.innerWidth,
    height: window.innerHeight
}
const EARTH_COLOR = '#C2B280'
// const SKY_COLOR = '#ADD8E6'
const SKY_COLOR = '#000000'
const POSSIBLE_PAGES = ['main', 'intro', 'school', 'work', 'learn_more']
// ----------

// Set the scene
let curr_page = "main"
const scene = new THREE.Scene()

var loader = new GLTFLoader();
let home_planet;
let intro_ring_planet;
let construction_planet;
let uof_planet;
let berkeley_planet;
let mixer;

loader.load( 'src/assets/main_planet.glb', function ( gltf )
{
    home_planet = gltf.scene;  // sword 3D object is loaded
    home_planet.scale.set(5, 5, 5);
    //home_planet.position.y = 4;
    scene.add(home_planet);

    if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(home_planet);
        
        // Add all animations from the GLB file to the mixer
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();  // Play each animation in the GLB
        });
    }

} );


loader.load( 'src/assets/intro_planet.glb', function ( gltf )
{
    intro_ring_planet = gltf.scene;  // sword 3D object is loaded
    intro_ring_planet.scale.set(5, 5, 5);
    intro_ring_planet.position.y = -95;
    intro_ring_planet.position.x = -10;
    intro_ring_planet.rotation.x = 10;
    scene.add(intro_ring_planet);
} );

loader.load('src/assets/berkley.glb', function (gltf) {
    berkeley_planet = gltf.scene;
    berkeley_planet.scale.set(1,1,1);
    berkeley_planet.position.x = 10;
    berkeley_planet.position.y = -210;

    berkeley_planet.rotation.x = 0.436;
    berkeley_planet.rotation.y = 4;
    scene.add(berkeley_planet)
});

loader.load('src/assets/uofc.glb', function (gltf) {
    uof_planet = gltf.scene;
    uof_planet.scale.set(1,1,1);
    uof_planet.position.x = -10;
    uof_planet.position.y = -195;

    uof_planet.rotation.x = 0.6;
    scene.add(uof_planet)
});

loader.load('src/assets/Uni_island.glb', function (gltf) {
    construction_planet = gltf.scene;
    construction_planet.scale.set(3,3,3);

    construction_planet.position.y = -405;

    construction_planet.rotation.x = 0.5;
    construction_planet.rotation.y = 0.5;

    scene.add(construction_planet)
})

// Create a sky

const background_sky = new THREE.PlaneGeometry(6000, 3000)
const sky_material = new THREE.MeshBasicMaterial( {
    color: SKY_COLOR,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh( background_sky, sky_material)
plane.position.set(0,0,-20)

scene.add(plane)

// Create twinkling star constellation

// Create the star geometry and materials
const createStar = (color, position) => {
    const starGeometry = new THREE.SphereGeometry(0.3, 64, 64);
    const starMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color, // Make sure emissive matches the color
        emissiveIntensity: 0.1, // Lower emissive intensity initially
        metalness: 0.1, // Slightly metallic to make it reflect light better
        roughness: 0.8, // Slightly rough to reduce shine
    });

    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    starMesh.position.set(position.x, position.y, position.z);
    scene.add(starMesh);

    return starMesh;
}

// Star positions (modify to place them where you want)
const starPositions = [
    { x: -15, y: -292, z: 0 },
    { x: -6, y: -308, z: 0 },
    { x: 5, y: -300, z: 0 },
    { x: 10, y: -304, z: 0 }
];


const createStarField = () => {
    const numStars = 10000; // Number of stars
    const geometry = new THREE.BufferGeometry();
    
    // Create positions for the stars
    const positions = new Float32Array(numStars * 3); // x, y, z for each star
    
    for (let i = 0; i < numStars; i++) {
        positions[i * 3] = Math.random() * 40 - 20; // Random x position
        positions[i * 3 + 1] = Math.random() * 75 - 325; // Random y position
        positions[i * 3 + 2] = Math.random() * 130 - 100; // Random z position
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create a material for the stars
    const material = new THREE.PointsMaterial({
        color: 0xffffff, // Star color
        size: 0.05, // Size of each star
        opacity: 0.7, // Transparency of stars
        transparent: true, // Enable transparency
    });
    
    // Create the points mesh and add it to the scene
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
};

createStarField();


// End Constellations


// Add light source
const sun = new THREE.DirectionalLight('#FFFFFF', 2)
sun.position.set(0, 20, 30)
scene.add(sun)

// Add camera
const camera = new THREE.PerspectiveCamera(45, SIZES.width/SIZES.height, 0.1, 100) // field of view, aspect ratio, clipping point
camera.position.z = 30 // z axis is out of the screen
camera.position.y = 0
scene.add(camera)

const original_camera_placement = camera.position

// Render
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(SIZES.width, SIZES.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


// Rerender to make this page responive
window.addEventListener("resize", () => {
    SIZES.width = window.innerWidth
    SIZES.height = window.innerHeight
    // Update the camera
    camera.updateProjectionMatrix()
    camera.aspect = SIZES.width / SIZES.height
    renderer.setSize(SIZES.width, SIZES.height)
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// Disable panning and zoom
controls.enableRotate = true
controls.enableRotate = true
controls.enabled = true

// Create raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    // Normalize mouse position to NDC (-1 to 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// constantly rerender everything
const loop = () => {
    controls.update()
    raycaster.setFromCamera(mouse, camera);

    if (mixer) {
        mixer.update(0.01);  // Update the animation each frame
    }

    renderer.render(scene, camera)
    // keep the "earth" rotating
    window.requestAnimationFrame(loop)
}
loop()

// Bring down the title and the nav menu
const tl = gsap.timeline({ defaults: { duration: 1}})
tl.fromTo('.title', {opacity: 0}, {opacity: 1})
tl.fromTo('nav', {y: "-100%"}, {y: "0%"})
const original_target = controls.target



// start adding event listeners for the various divs
document.getElementById("nav-down").addEventListener("click", navDownHandler)
document.getElementById("explore_again").addEventListener("click", navRestartHandler)

function navRestartHandler(e) {
    tl.to(".move_up", 
        {
            opacity: 0
    })
    tl.to(".construction", 
        {
            opacity: 0
    })

    curr_page = 'main'

    // pan camera up
    let desired_location = original_target
    gsap.to(controls.target, {
        y: 0,
        x: 0,
        z:0,
        duration: 3,
        onStart: () => {
            gsap.to(camera.position, {
                x: 0,
                y: 0,
                z: 30,
                duration: 1
            })

            start_page()
            controls.update()
            renderer.render(scene, camera)
            // keep the "earth" rotating
            window.requestAnimationFrame(loop)
        }
    })
    tl.to("#nav-down", 
        {
            opacity: 1
    })
    tl.to('#connect', {opacity: "0"}, {y: "1"})
}


function navDownHandler(e) {
    tl.to("#nav-down", 
        {
            opacity: 0
    })
    // get curr page
    let next_page_index = POSSIBLE_PAGES.indexOf(curr_page)
    if (next_page_index != POSSIBLE_PAGES.length - 1) {
        next_page_index += 1
    }
    curr_page = POSSIBLE_PAGES[next_page_index]

    // pan camera down
    let desired_location = {x: 0, y: camera.position.y - 100, z: camera.position.z}
    gsap.to(controls.target, {
        y: desired_location.y,
        x: 0,
        z:0,
        duration: 3,
        onStart: () => {
            gsap.to(camera.position, {
                x: desired_location.x,
                y: desired_location.y,
                z: desired_location.z,
                duration: 1
            })
            controls.update()
            renderer.render(scene, camera)
            // keep the "earth" rotating
            window.requestAnimationFrame(loop)

            if (curr_page == 'intro') {
                intro_page()
            }
        
            if (curr_page == 'school') {
                school_page()
            }
        
            if (curr_page == 'work') {
                career_page()
            }
        
            if (curr_page == 'learn_more') {
                construction_page()
            }
        
        }
    });
    
}

function start_page() {
    // make the title disappear, bring in the other divs
    tl.fromTo(".title", {opacity: 0}, {opacity: 1})
}

function intro_page(){
    // make the title disappear, bring in the other divs
    tl.fromTo(".title", {opacity: 1}, {opacity: 0})
    tl.fromTo('nav', {opacity: 1}, {opacity: 0})
    var div = document.getElementById("introduction");
    div.style.display = "block";
    tl.fromTo("#description", 
        {opacity: 0}, {opacity: 1}, "+=1")
        tl.to("#nav-down", 
            {
                opacity: 1
        })

}

function school_page() {
    tl.fromTo("#description", 
        {opacity: 1}, {opacity: 0})

    tl.fromTo(".school_description", 
        {opacity: 0}, {opacity: 1}, "+=1")
    
    tl.to("#nav-down", 
            {
                opacity: 1
        })

}

function setLineProperties(line, startPos, endPos) {
    const startX = startPos.left + startPos.width / 2;
    const startY = startPos.top + startPos.height / 2;
    const endX = endPos.left + endPos.width / 2;
    const endY = endPos.top + endPos.height / 2;

    // Set the line's position
    line.style.top = startY + "px";
    line.style.left = startX + "px";

    // Calculate the distance between the two points
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    
    // Set the width of the line based on the distance
    line.style.width = distance + "px";

    // Calculate the angle between the two points
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    // Set the rotation of the line based on the calculated angle
    line.style.transform = `rotate(${angle}deg)`;
}

// Function to position and animate the lines based on the positions of the stars
function updateLinePositions() {
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    const star1 = document.getElementById("star1");
    const star2 = document.getElementById("star2");
    const star3 = document.getElementById("star3");
    const star4 = document.getElementById("star4");

    const star1Position = star1.getBoundingClientRect();
    const star2Position = star2.getBoundingClientRect();
    const star3Position = star3.getBoundingClientRect();
    const star4Position = star4.getBoundingClientRect();

    // Calculate the position and length of the lines based on the stars' positions
    setLineProperties(line1, star1Position, star2Position);
    setLineProperties(line2, star2Position, star3Position);
    setLineProperties(line3, star3Position, star4Position);
}

function career_page() {
    tl.fromTo(".school_description", 
        {opacity: 1}, {opacity: 0})


    // Call the updateLinePositions to align lines correctly
    updateLinePositions();

    document.getElementById("star1").style.animation = "appear 2s forwards";
    document.getElementById("ibm_intern").style.animation = "appear_wo_scale 2s forwards 1s";
    document.getElementById("star2").style.animation = "appear 2s forwards 2s";
    document.getElementById("ibm").style.animation = "appear_wo_scale 3s forwards 2s";
    document.getElementById("star3").style.animation = "appear 2s forwards 4s";
    document.getElementById("aws").style.animation = "appear_wo_scale 3s forwards 4s";
    document.getElementById("star4").style.animation = "appear 2s forwards 6s";
    document.getElementById("aws_2").style.animation = "appear_wo_scale 3s forwards 6s";

    // Animate lines
    document.getElementById("line1").style.animation = "drawLine 2s forwards 2s";
    document.getElementById("line2").style.animation = "drawLine 2s forwards 4s";
    document.getElementById("line3").style.animation = "drawLine 2s forwards 6s";

    tl.to("#nav-down", 
        {
            opacity: 1
    })

}


function construction_page() {
    // enable construction div
    tl.to(".constellation", 
        {
            opacity: 0,
            duration: 1
        })
        tl.to(".career_description", 
            {
                    opacity: 0,
                    duration: 1
            })
        tl.to("#nav-down", 
                {
                    opacity: 0
            })

    tl.fromTo(".construction", 
            {opacity: 0}, {opacity: 1}, "+=1")
    tl.fromTo(".move_up", 
                {opacity: 0}, {opacity: 1}, "+=1")
    
    
}
