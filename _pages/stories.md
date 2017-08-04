---
layout: page
title: stories
permalink: /stories/
description: photo essays
---

{% assign stories = site.stories | sort:"date" | reverse %}

{% for story in stories %}

<div class="story-link">
    <a href="{{ story.url | prepend: site.baseurl | prepend: site.url }}">
    <img src="{{ story.cover | prepend: site.baseurl | prepend: site.url }}" />
    <div class="overlay">
    <div class="story-info">
        <h1 class="story-title">{{ story.title }}</h1>
        {% if story.description %}
        <p class="story-desc">{{ story.description }}</p>
        {% endif %}
        <p class="story-date">
            {{ story.date | date: "%B" }}
            {% assign day = story.date | date: "%-d"  %}
            {% case day %}
              {% when '1' or '21' or '31' %}{{ day }}st,
              {% when '2' or '22' %}{{ day }}nd,
              {% when '3' or '23' %}{{ day }}rd,
              {% else %}{{ day }}th,
            {% endcase %}
            {{ story.date | date: "%Y" }}
        </p>
    </div>
    </div>
    </a>
</div>

{% endfor %}
