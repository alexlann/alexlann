import Header from '../../Design/Layout/Header'
import t from "../../../data/translation";
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { About, Contact, Hero, Page, Projects, Skills } from '..';
import ScrollIndicator from '../../Design/Scroll/ScrollIndicator';
import { SectionsType } from '../../../types';

export default function Layout() {
  const scrollTo = (title: string) => {
    sectionsRef.current[sections[title].id].scrollIntoView({ behavior: "smooth" })
  }
  
  const sections: SectionsType = {
    hero: {
      id: 0,
      title: "hero",
      element: <Hero {...{scrollTo}} />,
      hero: true,
    },
    about: {
      id: 1,
      title: "about",
      sectionTitle: t["about-title"],
      element: <About />,
    },
    skills: {
      id: 2,
      title: "skills",
      sectionTitle: t["skills-title"],
      element: <Skills />,
    },
    projects: {
      id: 3,
      title: "projects",
      sectionTitle: t["projects-title"],
      element: <Projects />,
    },
    contact: {
      id: 4,
      title: "contact",
      sectionTitle: t["contact-title"],
      element: <Contact />,
    },
  };

  const [activeSection, setactiveSection] = useState(sections.hero.title);
  const sectionsRef: MutableRefObject<Element[]> = useRef([]);
  const refCallback = useCallback((section: Element) => {
    if (section) {
      sectionsRef.current.push(section);
    }
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px', // no margin
      threshold: 0.5, // 50% of target visible
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id && activeSection !== id) {
              setactiveSection(id);
              // TODO: hide grid and hero-wordCloud on scroll as long as two sections are visible at once
              // hideGrid();
            }
          }
        });
      },
      observerOptions
    );

    sectionsRef.current.forEach((section: Element) => {
      observer.observe(section);
    });

  });

  return (
    <div>
      <Header {...{ sections, activeSection, scrollTo }} />
      <div className="snap-mandatory snap-y h-screen w-full relative overflow-y-auto no-scrollbar">
        <ScrollIndicator {...{ sections, activeSection, scrollTo}} />
        <main>
          {Object.keys(sections).map((sectionId, index) => (
            <Page {...{refCallback}} section={sections[sectionId]} key={index} />
          ))}
        </main>
      </div>
    </div>
  )
}
