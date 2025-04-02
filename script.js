AFRAME.registerComponent('texture-fallback', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const defaultTexture = new THREE.TextureLoader().load('#defaultTex');
    defaultTexture.colorSpace = THREE.SRGBColorSpace; // Three.js r173+

    // Wait for renderer to initialize
    sceneEl.addEventListener('renderstart', () => {
      const loader = sceneEl.systems['gltf-model']?.loader;
      if (!loader) {
        console.error("GLTFLoader missing. Ensure 'gltf-model' is registered.");
        return;
      }

      // Patch texture loading
      const originalLoad = loader.load;
      loader.load = function (url, onLoad, onProgress, onError) {
        originalLoad.call(loader, url, 
          (gltf) => {
            // Replace failed textures post-load
            gltf.scene.traverse((child) => {
              if (child.material) {
                ['map', 'emissiveMap', 'normalMap'].forEach((slot) => {
                  const tex = child.material[slot];
                  if (tex?.isTexture && !tex.source?.data) {
                    child.material[slot] = defaultTexture.clone();
                    child.material.needsUpdate = true;
                  }
                });
              }
            });
            onLoad(gltf);
          },
          onProgress,
          (err) => {
            console.error("Texture load failed:", err);
            onError(err);
          }
        );
      };
    });
  }
});