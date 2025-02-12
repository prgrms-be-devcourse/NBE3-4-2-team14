package org.team14.webty.voting.entity;

import org.team14.webty.webtoon.entity.Webtoon;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
	name = "similar",
	uniqueConstraints = @UniqueConstraint(columnNames = {"webtoonId", "similarWebtoonName"})
)
public class Similar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long similarId;
	private String similarWebtoonName;
	private Long similarResult;
	private Long userId;
	@ManyToOne
	@JoinColumn(name = "webtoonId")
	private Webtoon webtoon;

	public void updateSimilarResult(Long similarResult) {
		this.similarResult = similarResult;
	}
}
