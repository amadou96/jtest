package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class RpTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rp.class);
        Rp rp1 = new Rp();
        rp1.setId(1L);
        Rp rp2 = new Rp();
        rp2.setId(rp1.getId());
        assertThat(rp1).isEqualTo(rp2);
        rp2.setId(2L);
        assertThat(rp1).isNotEqualTo(rp2);
        rp1.setId(null);
        assertThat(rp1).isNotEqualTo(rp2);
    }
}
