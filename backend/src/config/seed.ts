import User from '../modules/auth/user.model';
import Hero from '../modules/hero/hero.model';
import About from '../modules/about/about.model';
import Project from '../modules/projects/project.model';
import Blog from '../modules/blog/blog.model';
import Experience from '../modules/experience/experience.model';
import Contact from '../modules/contact/contact.model';
import Settings from '../modules/settings/settings.model';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    // 1. Seed Admin
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminUser = new User({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user seeded successfully.');
    }

    // 2. Seed Hero
    const heroExists = await Hero.findOne();
    if (!heroExists) {
      await Hero.create({
        title: 'PRECISION_ENGINEERING.EXE',
        subtitle: 'Architecting High-Performance Structural Systems & Digital Blueprints',
        ctaButtons: [
          { label: 'VIEW_PROJECTS', link: '/projects' },
          { label: 'INITIATE_CONTACT', link: '/contact' }
        ],
        backgroundMedia: 'https://images.unsplash.com/photo-1517433447747-2337d100062a?auto=format&fit=crop&q=80',
        overlayOpacity: 0.6
      });
      console.log('Hero data seeded.');
    }

    // 3. Seed About
    const aboutExists = await About.findOne();
    if (!aboutExists) {
      await About.create({
        description: 'Lead Structural Engineer with 8+ years of experience in commercial infrastructure and digital workflow automation. Expert in bridging the gap between physical architecture and high-scale software systems.',
        skills: ['Structural Analysis', 'BIM Coordination', 'Digital Twin Development', 'Infrastructure Logic'],
        tools: ['AutoCAD', 'Revit', 'Node.js', 'Angular', 'Python (Computational Design)'],
        resumeUrl: '#'
      });
      console.log('About data seeded.');
    }

    // 4. Seed Settings
    const settingsExists = await Settings.findOne();
    if (!settingsExists) {
      await Settings.create({
        siteTitle: 'TulyX Engineering Portfolio',
        logoUrl: '',
        theme: {
          primaryColor: '#64ffda',
          secondaryColor: '#0a192f',
          backgroundType: 'color',
          backgroundValue: '#0a192f',
          fontFamily: 'Inter'
        },
        socialLinks: [
          { name: 'LinkedIn', url: 'https://linkedin.com' },
          { name: 'GitHub', url: 'https://github.com' }
        ]
      });
      console.log('Settings data seeded.');
    }

    // 5. Seed Sample Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          title: 'Bridge Structural Alpha',
          slug: 'bridge-structural-alpha',
          description: 'High-tensile steel bridge schematic utilizing computational fluid dynamics for wind load optimization.',
          category: 'Infrastructure',
          tags: ['Structural', 'Steel', 'BIM'],
          technologies: ['Revit', 'Robot Structural Analysis'],
          media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1545143877-4ebee6303960?auto=format&fit=crop&q=80', thumbnail: '' }],
          featured: true
        },
        {
          title: 'Residential Node Sigma',
          slug: 'residential-node-sigma',
          description: 'Multi-story residential complex with modular pre-cast concrete units.',
          category: 'Residential',
          tags: ['Concrete', 'Modular'],
          technologies: ['AutoCAD', 'SAP2000'],
          media: [{ type: 'image', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', thumbnail: '' }],
          featured: false
        }
      ]);
      console.log('Sample projects seeded.');
    }

    // 6. Seed Sample Experience
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
       await Experience.create([
         {
           company: 'Global Infra Corp',
           role: 'Senior Structural Designer',
           duration: '2020 - Present',
           description: 'Leading the structural schematic phase for metropolitan bridge networks.',
           location: 'San Francisco, CA'
         },
         {
           company: 'Build-Tech Solutions',
           role: 'Junior Engineer',
           duration: '2017 - 2020',
           description: 'Developing digital twins for commercial real estate payloads.',
           location: 'Austin, TX'
         }
       ]);
       console.log('Experience data seeded.');
    }

    // 7. Seed Contact Data
    const contactExists = await Contact.findOne();
    if (!contactExists) {
      await Contact.create({
        email: 'engineer@tulyx.platform',
        phone: '+1 (555) 010-9988',
        address: 'Sector 7, Engineering District, Cloud City',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215152809539!2d-73.98509792415174!3d40.758074171387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus'
      });
      console.log('Contact data seeded.');
    }

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export default seedAdmin;
