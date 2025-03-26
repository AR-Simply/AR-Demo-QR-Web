AFRAME.registerComponent('default-textures', {
  schema: {
    textureId: { type: 'string', default: 'defaultTexture' } // ID of <img> in assets
  },

  init: function () {
    this.el.addEventListener('model-loaded', () => {
      const textureEl = document.querySelector(`#${this.data.textureId}`);
      const textureLoader = new THREE.TextureLoader();
      const defaultTexture = textureLoader.load(textureEl.src);
      defaultTexture.colorSpace = THREE.SRGBColorSpace;

      this.el.object3D.traverse((child) => {
        if (child.material) {
          // Override ALL textures (base color, emissive, etc.)
          child.material.map = defaultTexture;
          child.material.emissiveMap = defaultTexture;
          child.material.needsUpdate = true;
        } else{
          console.log("hit2")
          child.material = new THREE.MeshStandardMaterial({
            map: defaultTexture,          // Base color texture
            emissiveMap: defaultTexture,  // Glowing parts texture
            color: new THREE.Color(0xFFFFFF), // Base color
            emissive: new THREE.Color(0x000000), // Emissive color
            roughness: 0.5,
            metalness: 0.0
          });
          child.material.needsUpdate = true;
        };
      });
    });
  }
});