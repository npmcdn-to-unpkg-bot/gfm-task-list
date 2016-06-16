import './development.scss';
import '../src/main';
import * as request from 'superagent';

const html = require('html!./test.html');

$('body').append(html);

$('.render-btn').click( () => {
  const markdown = $('.source').val();
  if (markdown.length) {
    request
      .post('https://api.github.com/markdown')
      .set('Authorization', `Bearer ${GH_ACCESS_TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({
        mode: 'gfm',
        text: markdown
      })
      .end((err, res) => {
        $('.output').html(res.text);
        $('.output').gfmTaskList({
          markdownContainer: '.source',
          renderedContainer: '.output'
        });
      });
  }
});