---
layout: page
permalink: /publications/
title: key publications
years: [2025, 2024, 2023, 2022, 2021, 2020, 2018, 2017]
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
