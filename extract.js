const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('legacy.html', 'utf8');
const $ = cheerio.load(html);

const data = {
  platforms: []
};

$('.platform-section').each((i, section) => {
  const $section = $(section);
  const platformId = $section.attr('id').replace('section-', '');
  
  // Platform header info
  const $header = $section.find('.platform-header');
  const title = $header.find('.platform-info h2').text().trim() || $section.find('.praktik-intro h2').text().trim();
  const description = $header.find('.platform-info p').text().trim() || $section.find('.praktik-intro p').text().trim();
  
  // Phase blocks
  const phases = [];
  $section.find('.phase-block').each((j, block) => {
    const $block = $(block);
    const num = $block.find('.phase-num-badge').text().trim();
    const phaseTitle = $block.find('.phase-head-title').text().trim();
    const phaseMeta = $block.find('.phase-head-meta').text().trim();
    const tags = [];
    $block.find('.phase-tag').each((k, tag) => {
      tags.push($(tag).text().trim());
    });
    
    // Courses
    const courses = [];
    $block.find('.course-item').each((k, course) => {
      const $course = $(course);
      const order = $course.find('.course-order').text().trim();
      const courseName = $course.find('.course-name').text().trim();
      const courseDesc = $course.find('.course-desc').text().trim();
      const duration = $course.find('.course-dur').text().trim();
      
      const courseBadges = [];
      $course.find('.cbadge').each((l, badge) => {
        courseBadges.push($(badge).text().trim());
      });
      
      courses.push({ order, name: courseName, desc: courseDesc, duration, badges: courseBadges });
    });
    
    phases.push({ num, title: phaseTitle, meta: phaseMeta, tags, courses });
  });

  // Praktik specific
  const praktikGrid = [];
  $section.find('.praktik-card').each((j, card) => {
    const $card = $(card);
    const cardTitle = $card.find('.praktik-card-title').text().trim();
    const cardSub = $card.find('.praktik-card-sub').text().trim();
    const list = [];
    $card.find('.praktik-list li').each((k, li) => {
      list.push($(li).text().replace('›', '').trim());
    });
    praktikGrid.push({ title: cardTitle, sub: cardSub, list });
  });

  const milestones = [];
  $section.find('.milestone-step').each((j, ms) => {
    const $ms = $(ms);
    const num = $ms.find('.ms-num').text().trim();
    const msTitle = $ms.find('.ms-title').text().trim();
    const msDesc = $ms.find('.ms-desc').text().trim();
    milestones.push({ num, title: msTitle, desc: msDesc });
  });

  data.platforms.push({
    id: platformId,
    title,
    description,
    phases,
    praktikGrid,
    milestones
  });
});

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
console.log('Successfully extracted data to src/data.json');
