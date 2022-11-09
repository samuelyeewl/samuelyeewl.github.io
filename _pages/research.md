---
layout: page
title: research
permalink: /research/
description: some of my research interests
---

<!-- Under construction -->

{% assign projects = site.research | sort:"order" %}

{% for project in projects %}

<div class="section">
	<h3>{{ project.title }}</h3>
	{% if project.img %}
		{% include figure.html image=project.img  width="half" align=project.imgalign caption=project.imgcaption  %}
	{% endif %}
	{{ project.content }}
</div>

{% endfor %}
