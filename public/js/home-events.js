document.addEventListener('DOMContentLoaded', () => {
  const canvasHost = document.getElementById('events-canvas');
  const modalElement = document.getElementById('eventDetailModal');
  const eventList = document.getElementById('event-list');
  const form = document.getElementById('event-form');

  if (!canvasHost || !modalElement || !eventList || !form || !window.THREE || !Array.isArray(window.sessionEvents)) {
    return;
  }

  const formatDate = (date) => {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? '' : parsed.toLocaleString();
  };

  const setValue = (id, value) => {
    const input = document.getElementById(id);
    if (input) {
      input.value = value;
    }
  };

  const getValue = (id) => {
    const input = document.getElementById(id);
    return input ? input.value.toString() : '';
  };

  const renderEventList = () => {
    eventList.innerHTML = '';
    window.sessionEvents.forEach((eventItem) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${eventItem.event_id}</strong> — ${eventItem.title}`;
      eventList.appendChild(listItem);
    });
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0f172a');

  const camera = new THREE.PerspectiveCamera(55, Math.max(canvasHost.clientWidth, 300) / 420, 0.1, 1000);
  camera.position.z = 13;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(Math.max(canvasHost.clientWidth, 300), 420);
  canvasHost.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.9);
  directional.position.set(0, 8, 10);
  scene.add(directional);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const eventMeshes = [];

  const severityColor = {
    low: 0x10b981,
    medium: 0xf59e0b,
    high: 0xef4444,
    critical: 0xdc2626,
  };

  const rebuildMeshes = () => {
    eventMeshes.forEach(({ mesh }) => scene.remove(mesh));
    eventMeshes.length = 0;

    window.sessionEvents.forEach((eventItem, idx) => {
      const geometry = new THREE.SphereGeometry(0.75, 24, 24);
      const material = new THREE.MeshStandardMaterial({
        color: severityColor[eventItem.severity] ?? 0x3b82f6,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (idx - (window.sessionEvents.length - 1) / 2) * 3.4;
      scene.add(mesh);
      eventMeshes.push({ mesh, eventItem });
    });

    renderEventList();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    eventMeshes.forEach(({ mesh }, idx) => {
      mesh.rotation.y += 0.01;
      mesh.position.y = Math.sin(Date.now() / 700 + idx) * 0.6;
    });
    renderer.render(scene, camera);
  };

  const getIntersectedMesh = (clientX, clientY) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(eventMeshes.map(({ mesh }) => mesh));
    if (!intersects.length) {
      return null;
    }

    return eventMeshes.find(({ mesh }) => mesh === intersects[0].object) ?? null;
  };

  const fillFormFromEvent = (eventItem) => {
    setValue('event_id', eventItem.event_id);
    setValue('title', eventItem.title);
    setValue('summary', eventItem.summary);
    setValue('description', eventItem.description);
    setValue('status', eventItem.status);
    setValue('severity', eventItem.severity);
    setValue('first_seen', new Date(eventItem.first_seen).toISOString().slice(0, 16));
    setValue('last_seen', new Date(eventItem.last_seen).toISOString().slice(0, 16));
    setValue('created_at', formatDate(eventItem.created_at));
    setValue('updated_at', formatDate(eventItem.updated_at));
  };

  renderer.domElement.addEventListener('wheel', (event) => {
    event.preventDefault();
    camera.position.z = Math.max(5, Math.min(30, camera.position.z + event.deltaY * 0.01));
  });

  renderer.domElement.addEventListener('dblclick', (event) => {
    const selected = getIntersectedMesh(event.clientX, event.clientY);
    if (!selected) {
      return;
    }

    fillFormFromEvent(selected.eventItem);
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  });

  renderer.domElement.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const selected = getIntersectedMesh(event.clientX, event.clientY);
    if (!selected) {
      return;
    }

    window.sessionEvents = window.sessionEvents.filter(
      (eventItem) => eventItem.event_id !== selected.eventItem.event_id
    );
    rebuildMeshes();
  });

  form.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();

    const selectedId = getValue('event_id');
    const selectedIndex = window.sessionEvents.findIndex((eventItem) => eventItem.event_id === selectedId);
    if (selectedIndex < 0) {
      return;
    }

    const updatedEvent = new window.SessionEvent({
      event_id: selectedId,
      title: getValue('title'),
      summary: getValue('summary'),
      description: getValue('description'),
      status: getValue('status'),
      severity: getValue('severity'),
      first_seen: getValue('first_seen'),
      last_seen: getValue('last_seen'),
      created_at: window.sessionEvents[selectedIndex].created_at,
      updated_at: new Date().toISOString(),
    });

    window.sessionEvents.splice(selectedIndex, 1, updatedEvent);
    rebuildMeshes();

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();
  });

  window.addEventListener('resize', () => {
    const width = Math.max(canvasHost.clientWidth, 300);
    camera.aspect = width / 420;
    camera.updateProjectionMatrix();
    renderer.setSize(width, 420);
  });

  rebuildMeshes();
  animate();
});
