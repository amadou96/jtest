package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class MembreTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Membre.class);
        Membre membre1 = new Membre();
        membre1.setId(1L);
        Membre membre2 = new Membre();
        membre2.setId(membre1.getId());
        assertThat(membre1).isEqualTo(membre2);
        membre2.setId(2L);
        assertThat(membre1).isNotEqualTo(membre2);
        membre1.setId(null);
        assertThat(membre1).isNotEqualTo(membre2);
    }
}
