import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {

  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const scene = new THREE.Scene()

    // cube
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: "red" }))
    cube.position.set(2, 2, 0)
    scene.add(cube)

    // cone
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 32), new THREE.MeshStandardMaterial({ color: 0xffff00 }))
    cone.position.set(0, -2, 0)
    scene.add(cone)

    // circle
    const circle = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 8), new THREE.MeshStandardMaterial({ color: 0x234567 }))
    circle.position.set(-2, 3, 0)
    scene.add(circle)

    // Ring
    const Ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.13), new THREE.MeshStandardMaterial({ color: "blue", side: THREE.DoubleSide }))
    Ring.position.set(-2, 0, 0)
    scene.add(Ring)

    const ambient = new THREE.AmbientLight('white', 0.5);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight('white', 2);
    sun.position.set(2, 3, 4);
    scene.add(sun);

    // camera
    // aspect بيتحسب من حجم الـ canvas جوه resize() تحت
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    //  render
    // بنرسم جوه الـ canvas بتاع React بدل ما نعمل واحد جديد ونحطه في الـ body
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    // ده اللي كان عامل الـ pixelation: الشاشة فيها pixels أكتر من الـ CSS pixels
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor("white", 1)

    // responsive: المقاس من الـ canvas نفسه (العمود) مش من الشاشة كلها
    const resize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      renderer.setSize(width, height, false) // false: سيب مقاس الـ CSS زي ما هو
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()

    // بيتنده كل ما مقاس الـ canvas يتغيّر (resize للشاشة أو تغيير في الـ layout)
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const mouse = new THREE.Vector3()

    function targetMouse(event: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()

      // 1) مكان الماوس جوه الـ canvas من -1 لـ 1
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // 2) الكاميرا شايفة لحد فين عند z = 0؟ (فاكر رسمة الـ Frustum؟)
      //    نص الطول = tan(نص الـ fov) × بُعد الكاميرا
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      //    نص العرض = نص الطول × الـ aspect
      const halfWidth = halfHeight * camera.aspect

      // 3) اضرب الـ -1 لـ 1 في الحدود دي ← مكان حقيقي في العالم
      mouse.set(x * halfWidth, y * halfHeight, 0)
    }

    canvas.addEventListener("mousemove", targetMouse)


    // animation
    renderer.setAnimationLoop((time: number) => {
      const t = time / 1000

      // ring animation
      Ring.rotation.y = t
      Ring.position.y = Math.sin(t)
      // cone animation
      cone.rotation.z = Math.sin(t)
      // cube  animation
      cube.rotation.z = t
      cube.rotation.y = t

      // circle 
      // الكورة تنط على مكان الماوس (mouse اتحسب بالفعل بمقاس العالم في targetMouse)
      circle.position.copy(mouse)


      if (cube.position.distanceTo(circle.position) < 1) {
        cube.material.color.set("blue")
      } else {
        cube.material.color.set("red")

      }

      renderer.render(scene, camera)


    })


  }, [])


  return <canvas ref={ref} className="hero-canvas" />;

}
