// based on https://threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html

import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';

import { GUI } from 'https://unpkg.com/three@0.118.3/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/TransformControls.js';
import { DragControls } from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/DragControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/OBJLoader.js';
import { PLYLoader } from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/PLYLoader.js';

// import * as tf from 'https://unpkg.com/@tensorflow/tfjs-core@3.4.0';
// import * as tf from 'https://unpkg.com/@tensorflow/tfjs';
// import 'https://unpkg.com/@tensorflow/tfjs-backend-cpu@3.4.0';
// import 'https://unpkg.com/@tensorflow/tfjs-core@3.4.0';

// const a = tf.tensor([1,2,3,4]);
// a.print()
// console.log(a.print());

function main() {
    // const OBJColor = 0x2194CE;
    const OBJColor = 0x2e81d4;
    const OBJOpacity = 1;

    // init renderer
    const container = document.querySelector('#demo-container');
    const renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, alpha: true});
    // TODO: delete following 2 lines
    renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement)
    
    // init scene
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x808080);
    scene.background = new THREE.Color(0xFFFFFF);
    // scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 3, 15 );
    
    const fov = 45;
    const aspect = container.clientWidth / container.clientHeight;
    // const aspect = 2;  // the canvas default
    const near = 0.01;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // let {x, y, z} = sphericalToCart(3, 0, 0)
    // chair
    // let [x, y, z] = [1.7, 3, 2.25].map(x => x * scale);
    // let scale = 1.2;
    // let cameraPosition = [1.94515847577463, 0.772487180981709, 2.2497691693169424].map(x => x * scale);
    // let cameraRotation = [-0.3912286234799624, 0.5366379005261677, 0.20784082348737504];
    let cameraLookAt = [0, 0, 0];
    // let cameraLookAt = [-0.5112493893594757,-0.32772262668803287,-0.7944947714341858];
    
    // // plane
    // let scale = 1.2;
    // // // let [x, y, z] = [0.5 * scale, 2.5 * scale, 1.25 * scale];
    // let cameraPosition = [0.5 * scale, 2.5 * scale, 0 * scale];
    let scale = 0.6;
    let cameraPosition = [1.7, 3, 2.25].map(x => x * scale);
    // dualSDF
    // let cameraPosition = [1.7229492652657825, 1.4053401980124738, 2.120920557927234];
    // let scale = 0.7;
    // let cameraPosition = [1.3518370604886951, 1.821583023756495, 2.072730350363848].map(x => x * scale);

    camera.position.set(... cameraPosition);
    // camera.rotation.set(... cameraRotation);
    // camera.position.set(0, 2.5, 2.5);
    camera.lookAt(... cameraLookAt);
    scene.add(camera);
    
    // LIGHTS
    // scene.add(new THREE.AmbientLight(0xC89379));
    // scene.add( new THREE.AmbientLight( 0x585858 ) );

    // var light = new THREE.DirectionalLight( 0xE6D5E6, 1 );
    // light.position.set( 1.5, -1.5, 1.5 );
    // scene.add( light );
    // var geometry = new THREE.SphereGeometry(0.04, 16, 16);
    // var material = new THREE.MeshBasicMaterial({color: light.color});
    // var point = new THREE.Mesh(geometry, material);
    // point.position.copy(light.position);
    // scene.add(point)
    
    // var light = new THREE.DirectionalLight( 0xccccff, 1 );
    // light.position.set( 0, 3, 1 );
    // scene.add( light );
    // var geometry = new THREE.SphereGeometry(0.04, 16, 16);
    // var material = new THREE.MeshBasicMaterial({color: light.color});
    // var point = new THREE.Mesh(geometry, material);
    // point.position.copy(light.position);
    // scene.add(point)
    
    // var light = new THREE.HemisphereLight( 0x444444, 0x444444 );
    // light.position.set( 0, 20, 0 );
    // scene.add( light );
    // var geometry = new THREE.SphereGeometry(1, 16, 16);
    // var material = new THREE.MeshBasicMaterial({color: 0x0});
    // var point = new THREE.Mesh(geometry, material);
    // point.position.copy(light.position);
    // scene.add(point)
    
    // var light = new THREE.DirectionalLight( 0xaaaaaa );
    // light.position.set( 1, 5, 5 );
    // light.castShadow = true;
    // light.shadow.camera.top = 10;
    // light.shadow.camera.bottom = - 10;
    // light.shadow.camera.left = - 10;
    // light.shadow.camera.right = 10;
    // light.shadow.camera.near = 0.1;
    // light.shadow.camera.far = 40;
    // scene.add( light );
    // var light = new THREE.DirectionalLight( 0xaaaaaa );
    // light.position.set( 1, 10, -5 );
    // scene.add( light );
    // var geometry = new THREE.SphereGeometry(1, 16, 16);
    // var material = new THREE.MeshBasicMaterial({color: 0x0});
    // var point = new THREE.Mesh(geometry, material);
    // point.position.copy(light.position);
    // scene.add(point)

    let ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
    scene.add( ambientLight );

    let hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x646464, 0.65 );
    hemisphereLight.position.set( 0, 20, 0 );
    scene.add( hemisphereLight );

    let spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 1, 5, 5 );
    spotLight.angle = 0.15 ;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.intensity = 0.28;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    scene.add( spotLight );

    let spotLight2 = new THREE.SpotLight( 0xffffff, 1 );
    spotLight2.position.set( 5, 5, -1 );
    spotLight2.angle = 0.15;
    spotLight2.penumbra = 1;
    spotLight2.decay = 2;
    spotLight2.distance = 200;
    spotLight2.intensity = 0.56;

    spotLight2.castShadow = true;
    spotLight2.shadow.mapSize.width = 512;
    spotLight2.shadow.mapSize.height = 512;
    spotLight2.shadow.camera.near = 10;
    spotLight2.shadow.camera.far = 200;
    spotLight2.shadow.focus = 1;
    scene.add( spotLight2 );

    // let lightHelper = new THREE.SpotLightHelper( spotLight );
    // scene.add( lightHelper );

    // let shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    // scene.add( shadowCameraHelper );

    // GROUND
    var groundMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( {
            color: 0x7f7f7f,
            depthWrite: false
        } )
    );
    groundMesh.position.set(0, -1.5, 0 );
    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.receiveShadow = true;
    // scene.add( groundMesh );
    
    // add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = near;
    controls.maxDistance = far;
    controls.enableDamping = false;
    controls.autoRotate = false;
    controls.zoomSpeed = 0.2;
    controls.addEventListener('end', () => {
        let vector = new THREE.Vector3( 0, 0, - 1 );
        vector.applyQuaternion( camera.quaternion );
        // console.log(
        //     'postion: ' + camera.position['x'] + ', ' + camera.position['y'] + ', ' + camera.position['z'] + 
        //     ' rotation: ' + camera.rotation['x'] + ', ' + camera.rotation['y'] + ', ' + camera.rotation['z'] + 
        //     ' cameraLookAt: ' + vector.toArray());
    });
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    
    // show axes
    var axesHelper = new THREE.AxesHelper(1);
    // scene.add(axesHelper);
    
    // keypoints
    var pointsCounter = 0;
    var keypointsMeshes = [];
    var sourceKeypoints;
    var weights = [];
    var influence = [];
    var cageVertices = [];
    var vertices = [];
    var faces = [];
    var prevKeypointsURL = null;
    let selected = new THREE.Group();
    // let group = new THREE.Group();
    let group = [];
    scene.add( selected );
    // scene.add( group );
    let enableSelection = false;
    let enableReset = false;
    const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();


    // objects
    var object_mesh = new THREE.Object3D;
    scene.add(object_mesh)
    // var cage = new THREE.Object3D;
    // scene.add(cage)

    // keypoints control
    // based on https://threejs.org/examples/webgl_geometry_spline_editor.html
    controls.addEventListener('start', function() {
        cancelHideTransform();
    });

    controls.addEventListener('end', function () {
        delayHideTransform();
    });

    const transformControl = new TransformControls(camera, renderer.domElement);
    transformControl.addEventListener('change', render);
    transformControl.addEventListener('mouseUp', () => {if (!enableSelection) {fetchMeshTransform()}});
    // transformControl.addEventListener('mouseDown', () => {prevKeypointsURL = keypointsToURL(keypointsMeshes)});
    transformControl.addEventListener('dragging-changed', event => {
        controls.enabled = ! event.value;
    });
    scene.add(transformControl);
    
    // Hiding transform situation is a little in a mess :()
    transformControl.addEventListener('change', function () {
        cancelHideTransform();
    });
    
    transformControl.addEventListener('mouseDown', function () {
        cancelHideTransform();
    });
    
    transformControl.addEventListener('mouseUp', function () {
        delayHideTransform();
    });
    
    transformControl.addEventListener('objectChange', function () {
    });
    
    const dragcontrols = new DragControls(keypointsMeshes, camera, renderer.domElement);
    dragcontrols.enabled = false;
    dragcontrols.addEventListener('hoveron', event => {
        if (enableReset) {
            transformControl.detach(transformControl.object);
            let temp = [... selected.children];
            // selected.children.forEach(x => scene.attach(x))
            selected.remove(...selected.children);
            selected.position.copy(event.object.position);
            // group.children = [... selected]
            temp.forEach(x => selected.attach(x))
        }
        // transformControl.attach(selected);
        if (!transformControl.dragging) {
            transformControl.detach(transformControl.object)
            transformControl.attach(event.object);
            cancelHideTransform();
        }
    });
    dragcontrols.addEventListener('hoveroff', function () {
        delayHideTransform();
    });

    var hiding;

    function delayHideTransform() {
        cancelHideTransform();
        hideTransform();
    }

    function hideTransform() {
        hiding = setTimeout(function () {
            transformControl.detach(transformControl.object);
        }, 1000);
    }

    function hideTransformNow() {
        transformControl.detach(transformControl.object)
    }

    function cancelHideTransform() {
        if (hiding) clearTimeout(hiding);
    }

    document.addEventListener( 'click', onClick, false );
    window.addEventListener( 'keydown', onKeyDown, false );
    window.addEventListener( 'keyup', onKeyUp, false );

    function onKeyDown( event ) {

        enableSelection = ( event.keyCode === 16 ) ? true : false;
        enableReset = ( event.keyCode === 17 ) ? true : false;

    }

    function onKeyUp() {

        enableSelection = false;
        enableReset = false;

    }

    function onClick( event ) {
        if ( enableSelection === true ) {
            // keypointsMeshes.forEach(x => group.attach(x))
            mouse.x = ( event.clientX / container.clientWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / container.clientHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, camera );
            
            const intersections = raycaster.intersectObjects( keypointsMeshes, true );

            if ( intersections.length > 0 ) {
                const object = intersections[ 0 ].object;

                if ( selected.children.includes( object ) === true ) {

                    object.material.emissive.set( 0x000000 );
                    scene.attach( object );

                } else {

                    object.material.emissive.set( 0xaaaaaa );
                    selected.attach( object );

                }

            }
        }
    }

    // function onClick( event ) {

    //     event.preventDefault();

    //     if ( enableSelection === true ) {

    //         const draggableObjects = dragcontrols.getObjects();
    //         draggableObjects.length = 0;

    //         // container.clientWidth, container.clientHeight
    //         mouse.x = ( event.clientX / container.clientWidth ) * 2 - 1;
    //         mouse.y = - ( event.clientY / container.clientHeight ) * 2 + 1;

    //         raycaster.setFromCamera( mouse, camera );
            
    //         const intersections = raycaster.intersectObjects( keypointsMeshes, true );

    //         if ( intersections.length > 0 ) {

    //             const object = intersections[ 0 ].object;

    //             if ( group.children.includes( object ) === true ) {

    //                 object.material.emissive.set( 0x000000 );
    //                 scene.attach( object );

    //             } else {

    //                 object.material.emissive.set( 0xaaaaaa );
    //                 group.attach( object );

    //             }

    //             dragcontrols.transformGroup = true;
    //             draggableObjects.push( group );

    //         }

    //         if ( group.children.length === 0 ) {

    //             dragcontrols.transformGroup = false;
    //             draggableObjects.push( ...keypointsMeshes );

    //         }

    //     }

    //     render();

    // }

    
    function addPoint(scene, position, keypointsMeshes=null, name=null) {
        if (name == null) {
            name = pointsCounter.toString().padStart(3, '0');
        }

        var color = hashStringToColor(name);

        var geometry = new THREE.SphereGeometry(0.09, 32, 32);
        // var material = new THREE.MeshBasicMaterial({color: color});
        var material = new THREE.MeshPhongMaterial({
            color: color, flatShading: false});
        var m = new THREE.Mesh(geometry, material);
        m.position.copy(position);

        var point = {
            name: name,
            color: color,
            m: m
        }

        // pointsFolder.add(point, 'name');

        // var controller = pointsFolder.addColor(point, 'color');
        // controller.onChange(function(value) {
        //     m.material.color.setHex(value);
        // });

        // points
        // points.push( point );
        if (keypointsMeshes != null) {
            keypointsMeshes.push(point.m);
        }
        scene.add(m);

        pointsCounter++ ;
    }
    

    function fetchText(url, onLoadFn) {
        fetch(url).then(response => {
            return response.text()
        }).then(text => {
            onLoadFn(text);
        });
    }
    

    function fetchJSON(url, onLoadFn) {
        fetch(url).then(response => {
            return response.json()
        }).then(json => {
            onLoadFn(json);
        });
    }
    

    function fetchBlob(url, onLoadFn) {
        fetch(url).then(response => {
            return response.blob()
        }).then(blob => {
            var objectURL = URL.createObjectURL(blob);
            onLoadFn(objectURL);
        });
    }


    function loadKeypoints(string, scene, keypointsMeshes=null) {
        var keypoints = parseKeypoints(string);
        for (let {name, position} of keypoints) {
            addPoint(scene, position, keypointsMeshes=keypointsMeshes, name=name);
        }
        return keypoints;
    }

    
    function parseKeypoints(string) {
        var keypoints = [];
        var lines = string.split('\n');
        for (const line of lines) {
            var split = line.split(' ');
            if (split.length != 4) 
                continue;
            var name = split[0];
            var position = new THREE.Vector3(parseFloat(split[1]), parseFloat(split[2]), parseFloat(split[3]))
            keypoints.push({name, position});
        }
        return keypoints;
    }

    
    function parseTXTMatrix(string) {
        var matrix = [];
        var lines = string.split('\n');
        for (const line of lines) {
            if (line.length == 0) 
                continue;
            var row = line.split(' ');
            row = row.map(x => parseFloat(x));
            matrix.push(row);
        }
        return matrix;
    }


    function updateKeypoints(string, keypointsMeshes) {
        var keypoints = parseKeypoints(string);
        keypointsMeshes.forEach((mesh, i) => {
            let {name, position} = keypoints[i];
            mesh.position.copy(position);
        });
    }

    function getOBJMaterial() {
        var material = new THREE.MeshPhongMaterial({
            color: OBJColor, flatShading: true, dithering: true, opacity: OBJOpacity, transparent: true})
        return material
    }

    function loadOBJ(url, fn) {
        var loader = new OBJLoader();
        loader.load(url, onLoad);
        
        function onLoad(object) {
            var material = getOBJMaterial();

            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
                    child.geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                    // child.geometry.mergeVertices();
                }
            });

            // setSmoothGeometry(object);

            // merge
            var mesh = object.children[0];
            // mesh.geometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry);
                
            // // add wireframe
            // var geo = new THREE.EdgesGeometry(mesh.geometry); // or WireframeGeometry
            // var mat = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 2});
            // var wireframe = new THREE.LineSegments(geo, mat);
            // mesh.add(wireframe);
            
            fn(mesh);
        }
    }


    function loadPLY(url, fn) {
        var loader = new PLYLoader();
        loader.load(url, onLoad);
        
        function onLoad(geometry) {
            geometry.computeVertexNormals();
            var material = new THREE.MeshStandardMaterial({
                color: 0x0055ff, opacity: 0.1, transparent: true});
            // var material = new THREE.MeshPhongMaterial({
            //     color: 0x0055ff, side: THREE.DoubleSide, 
            //     flatShading: false, shininess: 100,  opacity: 0.05, transparent: true});
            var mesh = new THREE.Mesh( geometry, material );
            
            // add wireframe
            var geo = new THREE.EdgesGeometry(mesh.geometry); // or WireframeGeometry
            var mat = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 2});
            var wireframe = new THREE.LineSegments(geo, mat);
            mesh.add(wireframe);
            
            fn(wireframe);
        }
    }


    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( container.clientWidth, container.clientHeight );
    }


    function animate() {
        onWindowResize();
        requestAnimationFrame(animate);
        render();
    }

    
    function render() {
        // lightHelper.update();
        renderer.render(scene, camera);
    }


    function keypointsToURL(keypointsMeshes) {
        var coordinates = [];
        for (const mesh of keypointsMeshes) {
            let position = new THREE.Vector3()
            mesh.getWorldPosition(position);
            // let position = mesh.position;
            var coordinate = position.x + ',' + position.y + ',' + position.z;
            coordinates.push(coordinate);
        }
        return coordinates.join(';');
    }

    function keypointsMeshesToMatrix(keypointsMeshes) {
        var coordinates = [];
        for (const mesh of keypointsMeshes) {
            let position = new THREE.Vector3()
            mesh.getWorldPosition(position);
            coordinates.push([position.x, position.y, position.z]);
        }
        return coordinates;
    }

    function fetchMeshTransform() {
        var targetKeypoints = keypointsMeshesToMatrix(keypointsMeshes);
        var keypointsOffset = tf.sub(targetKeypoints, sourceKeypoints);
        var cageOffset = tf.sum(tf.mul(keypointsOffset.expandDims(1), influence.expandDims(-1)), 0);
        var newCageVertices = tf.add(cageVertices, cageOffset);
        var newVertices = tf.sum(tf.mul(newCageVertices.expandDims(0), weights.expandDims(-1)), 1);

        tf.unstack(newVertices).forEach(function(v, i) {
            object_mesh.children[0].geometry.vertices[i].set(... v.dataSync());
        });
        object_mesh.children[0].geometry.verticesNeedUpdate = true;
        
        // ws.send(JSON.stringify({action: 'deform', keypoints: prevKeypointsURL + '+' + keypointsURL}));
        
        // fetchJSON('?' + prevKeypointsURL + '+' + keypointsURL, json => {
        //     fetchText(json.target_keypoints, text => {
        //         updateKeypoints(text, keypointsMeshes);
        //     });
        //     loadOBJ(json.deformed_mesh, mesh => {
        //         // object_mesh.children[0].geometry.attributes.position = mesh.geometry.attributes.position
        //         // Workaround of webgl error:
        //         object_mesh.remove(object_mesh.children[0]);
        //         object_mesh.add(mesh);
        //         render();
        //     });
        //     // loadPLY(json.deformed_cage, mesh => {
        //     //     cage.remove(cage.children[0]);
        //     //     cage.add(mesh);
        //     // });
        // });
    }

    function loadVerticesFacesMesh(vertices, faces) {
        var geometry = new THREE.Geometry();
        vertices.forEach(x => geometry.vertices.push(new THREE.Vector3(... x)));
        faces.forEach(x => geometry.faces.push(new THREE.Face3(... x)));
        geometry.computeBoundingSphere();
        // geometry.computeFaceNormals();
        var material = getOBJMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        mesh.geometry.verticesNeedUpdate = true;
        return mesh
    }

    // ws.addEventListener('message', function(m) {
    //     var message = JSON.parse(m.data);
    //     // console.log('[ws:onmessage] Received new vertices!: ' + message.vertices);
    //     console.log(message.action);
    //     if (message.action == 'load') {
    //         var mesh = loadVerticesFacesMesh(message.vertices, message.faces)
    //         object_mesh.add(mesh);
    //     } else if (message.action == 'deform') {
    //         updateKeypoints(message.keypoints, keypointsMeshes);
            
    //         message.vertices.forEach(function(v, i) {
    //             object_mesh.children[0].geometry.vertices[i].set(... v);
    //         });
    //         object_mesh.children[0].geometry.verticesNeedUpdate = true;

    //         // vertices.forEach(x => object_mesh.children[0].geometry.vertices.push(new THREE.Vector3(... x)));
    //         // var mesh = loadVerticesFacesMesh(message.vertices, message.faces)

    //         // object_mesh.remove(object_mesh.children[0]);
    //         // object_mesh.add(mesh);
    //     }
    //     // message.vertices.forEach(function(v, i) {
    //     //     object_mesh.children[0].geometry.vertices[i].set(... v);
    //     // });
    //     // var position = [];
    //     // for (const vertices of message.vertices) {
    //     //     position.push(parseFloat(vertices[0]));
    //     //     position.push(parseFloat(vertices[1]));
    //     //     position.push(parseFloat(vertices[2]));
    //     // }
    //     // object_mesh.children[0].geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
    //     // vertices.forEach(function(v, i) {
    //     //   mainObject.geometry.vertices[i].set(v.x, v.y, v.z);
    //     //   handlerObjects[i].position.set(v.x, v.y, v.z);
    //     // });
    //     // mainObject.geometry.verticesNeedUpdate = true;
    //   });

    // run 
    var elem = document.querySelector('#demo-container')
    // loadOBJ(elem.dataset.obj, mesh => {
    //     object_mesh.add(mesh)
    //     if (elem.dataset.hasOwnProperty('ply')) {
    //         // loadPLY(elem.dataset.ply, mesh => cage.add(mesh));
    //     }
    // });
    // ws.onopen = function() {
    //     ws.send(JSON.stringify({action: 'load'}));
    // };
    
    if (elem.dataset.hasOwnProperty('kpts')) {
        fetchText(elem.dataset.kpts, text => {
            var keypoints = loadKeypoints(text, scene, keypointsMeshes=keypointsMeshes);
            sourceKeypoints = tf.tensor(keypoints.map(x => [x.position.x, x.position.y, x.position.z]));
        });
    }

    if (elem.dataset.hasOwnProperty('weights')) {
        fetchText(elem.dataset.weights, text => {
            weights = tf.tensor(parseTXTMatrix(text));
        });
    }

    if (elem.dataset.hasOwnProperty('influence')) {
        fetchText(elem.dataset.influence, text => {
            influence = tf.tensor(parseTXTMatrix(text));
        });
    }

    if (elem.dataset.hasOwnProperty('cage')) {
        fetchText(elem.dataset.cage, text => {
            cageVertices = tf.tensor(parseTXTMatrix(text));
        });
    }

    if (elem.dataset.hasOwnProperty('vertices')) {
        fetchText(elem.dataset.vertices, text => {
            // vertices = tf.tensor(parseTXTMatrix(text));
            vertices = parseTXTMatrix(text);
            fetchText(elem.dataset.faces, text => {
                // faces = tf.tensor(parseTXTMatrix(text));
                faces = parseTXTMatrix(text);
                var mesh = loadVerticesFacesMesh(vertices, faces);
                object_mesh.add(mesh);
            });
        });
    }

    

    function addSpotLightGUI(gui, spotLight) {
        var params = {
            'light color': spotLight.color.getHex(),
            intensity: spotLight.intensity,
            distance: spotLight.distance,
            angle: spotLight.angle,
            penumbra: spotLight.penumbra,
            decay: spotLight.decay,
            focus: spotLight.shadow.focus
        };

        gui.addColor( params, 'light color' ).onChange( function ( val ) {

            spotLight.color.setHex( val );
            render();

        } );

        gui.add( params, 'intensity', 0, 1 ).onChange( function ( val ) {

            spotLight.intensity = val;
            render();

        } );


        gui.add( params, 'distance', 50, 200 ).onChange( function ( val ) {

            spotLight.distance = val;
            render();

        } );

        gui.add( params, 'angle', 0, Math.PI / 3 ).onChange( function ( val ) {

            spotLight.angle = val;
            render();

        } );

        gui.add( params, 'penumbra', 0, 1 ).onChange( function ( val ) {

            spotLight.penumbra = val;
            render();

        } );

        gui.add( params, 'decay', 1, 2 ).onChange( function ( val ) {

            spotLight.decay = val;
            render();

        } );

        gui.add( params, 'focus', 0, 1 ).onChange( function ( val ) {

            spotLight.shadow.focus = val;
            render();

        } );
    }

    function addHemisphereLightGUI(gui, spotLight) {
        var params = {
            'light color': spotLight.color.getHex(),
            groundColor: spotLight.groundColor.getHex(),
            intensity: spotLight.intensity,
        };

        gui.addColor( params, 'light color' ).onChange( function ( val ) {

            spotLight.color.setHex( val );
            render();

        } );
        gui.addColor( params, 'groundColor' ).onChange( function ( val ) {

            spotLight.groundColor.setHex( val );
            render();

        } );

        gui.add( params, 'intensity', 0, 1 ).onChange( function ( val ) {

            spotLight.intensity = val;
            render();

        } );
    }

    function addAmbientLightGUI(gui, spotLight) {
        var params = {
            'light color': spotLight.color.getHex(),
            intensity: spotLight.intensity,
        };

        gui.addColor( params, 'light color' ).onChange( function ( val ) {

            spotLight.color.setHex( val );
            render();

        } );

        gui.add( params, 'intensity', 0, 1 ).onChange( function ( val ) {

            spotLight.intensity = val;
            render();

        } );
    }

    var params = {
        color: OBJColor,
        opacity: OBJOpacity,
        orbitControl: true,
        screenshot: function () {hideTransformNow(); saveAsImage(renderer);},
        // cameraX: camera.position.x,
        resetCamera: function () {
            // camera.position.set(x, y, z);
            camera.position.set(... cameraPosition);
            camera.lookAt(0, 0, 0);
            // camera.rotation.set(... cameraRotation);
        }
        
    };

    var gui = new GUI();
    gui.add( params, 'screenshot' );
    gui.add( params, 'resetCamera' );
    gui.add( params, 'orbitControl' ).onChange( function ( val ) {
        controls.enableZoom = val;
        controls.enablePan = val;
        controls.enableRotate = val;
    } );
    // gui.add( params, 'cameraX', -3, 3).listen();
    // gui.add( params, 'cameraX', -3, 3 ).onChange( function ( val ) {
    //     camera.position.x = val;
    //     render();
    // } );
    gui.addColor( params, 'color' ).onChange( function ( val ) {
        object_mesh.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.color.setHex( val );
            }
        });
        render();
    } );
    gui.add( params, 'opacity', 0, 1 ).onChange( function ( val ) {
        object_mesh.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.opacity = val;
            }
        });
        render();
    } );
    
    var folder = gui.addFolder('spotLight');
    addSpotLightGUI(folder, spotLight);
    var folder = gui.addFolder('spotLight2');
    addSpotLightGUI(folder, spotLight2);
    
    var folder = gui.addFolder('hemisphereLight');
    addHemisphereLightGUI(folder, hemisphereLight);

    var folder = gui.addFolder('ambientLight');
    addAmbientLightGUI(folder, ambientLight);

    gui.open();

    onWindowResize();
    animate();
    
}

function hashStringToColor(string) {
    var hash = hashString(string);
    var color = hash % 0xffffff;
    return color;
}

function hashString(str) {
    // based on: https://github.com/darkskyapp/string-hash/blob/master/index.js
    // var hash = 0, i, chr;
    // for (i = 0; i < string.length; i++) {
    // 	chr   = string.charCodeAt(i);
    // 	hash  = ((hash << 5) - hash) + chr;
    // 	hash |= 0; // Convert to 32bit integer
    // }
    // return hash;
    var hash = 5381,
    i = str.length;

    while(i) {
        hash = (hash * 5381) ^ str.charCodeAt(--i);
    }

    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
    * integers. Since we want the results to be always positive, convert the
    * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
}

function sphericalToCart(r, azimuth, elevation) {
    // inputs in degrees
    var x = r * Math.sin(elevation * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180);
    var y = r * Math.sin(elevation * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180);
    var z = r * Math.cos(elevation * Math.PI / 180);
    return {x, y, z};
}

function saveAsImage(renderer) {
    var imgData;

    try {
        var strMime = "image/png";
        var strDownloadMime = "image/octet-stream";
        imgData = renderer.domElement.toDataURL(strMime);

        saveFile(imgData.replace(strMime, strDownloadMime), "screenshot.png");

    } catch (e) {
        console.log(e);
        return;
    }

}

var saveFile = function (strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

function setSmoothGeometry(obj) {
    obj.traverse(node => {
        if ('geometry' in node) {
            const tempGeometry = new THREE.Geometry().fromBufferGeometry( node.geometry );
            tempGeometry.mergeVertices();
            tempGeometry.computeVertexNormals(true);
            node.geometry = new THREE.BufferGeometry().fromGeometry( tempGeometry );
        }
    })
}

main();
