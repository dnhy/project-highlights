import { onMounted, type Ref } from "vue";

const callback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => {
  entries.forEach((entry, index) => {
    if (entry.intersectionRatio <= 0) return;
    const img = entry.target;
    const src = img.getAttribute("data-src");
    img.setAttribute("src", src ?? "");
    observer.unobserve(entry.target);
  });
};

// root默认为浏览器窗口
const options = {
  rootMargin: "0px",
  threshold: 0.5,
};

export function useImage(ref: Ref) {
  const observer = new IntersectionObserver(callback, options);
  onMounted(() => {
    Object.keys(ref.value).forEach((i) => {
      observer.observe(ref.value[i]);
    });
  });
}
