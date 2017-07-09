---
layout: page
title: research
permalink: /research/
description: some of my research interests.
---

{% for project in site.research %}

<div class="section">
	<h3>{{ project.title }}</h3>
	{% if project.img %}
		<img class="half {{ project.imgalign }}" src="{{ project.img | prepend: '/assets/img/' | prepend: site.baseurl | prepend: site.url }}">
	{% endif %}
	{{ project.content }}
</div>

{% endfor %}