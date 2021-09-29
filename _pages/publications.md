---
layout: page
permalink: /publications/
title: publications
years: [2021, 2020, 2018, 2017, 2011]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
